package com.account.service;

import com.account.component.JwtTokenProvider;
import com.account.dataTransferObject.TokenMetadataDTO;
import com.account.dataTransferObject.UserDetailDTO;
import com.account.dataTransferObject.request.LogoutRequest;
import com.account.dataTransferObject.request.OAuth2LoginRequest;
import com.account.dataTransferObject.request.RefreshTokenRequest;
import com.account.dataTransferObject.response.AccountResponse;
import com.account.dataTransferObject.response.OAuth2UrlResponse;
import com.account.exception.AccountException;
import com.account.model.User;
import com.account.repository.UserRepository;
import com.account.service.impl.GoogleOAuth2ServiceImpl;
import com.account.exception.AppException;
import com.account.exception.ResourceException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final StoreStaffService storeStaffService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CacheService cacheService;
    private final GoogleOAuth2ServiceImpl googleOAuth2Service;

    private static final String USER_CACHE_KEY = "user:";
    private static final Duration USER_CACHE_TTL = Duration.ofMinutes(30);

    public OAuth2UrlResponse getOAuth2Url(String loginType) {
        loginType = loginType.trim().toLowerCase();
        if (loginType.equals("google")) {
            return googleOAuth2Service.getAuthorizationUrl();
        }
        throw new AppException(AccountException.OAUTH_PROVIDER_NOT_SUPPORTED);
    }

    /**
     * Authenticate OAuth2 token and generate JWT tokens.
     */
    @Transactional
    public AccountResponse oauth2Login(OAuth2LoginRequest request) {
        String loginType = request.getProvider().toLowerCase();
        if (!loginType.equals("google")) {
            throw new AppException(AccountException.OAUTH_PROVIDER_NOT_SUPPORTED);
        }
        User user = googleOAuth2Service.authenticateUser(request.getCode());
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isEmpty()) {
            user = userRepository.save(user);
        } else {
            User existingUser = optionalUser.get();
            existingUser.setFullName(user.getFullName());
            existingUser.setAvatarUrl(user.getAvatarUrl());
            user = userRepository.save(existingUser);
        }

        TokenMetadataDTO tokenMetadata = new TokenMetadataDTO(
                user.getId(),
                user.getFullName(),
                new Date()
        );
        var token = jwtTokenProvider.generateTokens(tokenMetadata);
        UserDetailDTO userDetailDTO = new UserDetailDTO(user.getId(), user.getRole().name(), user.getFullName());
        cacheService.set(USER_CACHE_KEY + user.getEmail(), userDetailDTO, USER_CACHE_TTL);
        return AccountResponse.of(user, token);
    }

    public void logout(LogoutRequest request) {
        var authorizationHeader = request.getAuthorizationHeader();
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new AppException(ResourceException.ACCESS_DENIED);
        }
        String accessToken = authorizationHeader.substring(7);
        var jwtClaimAccessToken = jwtTokenProvider.verifyToken(accessToken);
        if (jwtClaimAccessToken.isEmpty()) {
            throw new AppException(ResourceException.ACCESS_DENIED);
        }
        var expirationTime = jwtClaimAccessToken.get().getExpirationTime();
        Date now = new Date();
        long ttl = (expirationTime.getTime() - now.getTime()) / 1000;
        cacheService.set("BLACK_LIST:" + accessToken, expirationTime, Duration.ofSeconds(ttl));
    }

    /**
     * Refresh the access token using the refresh token.
     */
    public AccountResponse refreshToken(RefreshTokenRequest request) {
        if (cacheService.exists("BLACK_LIST:" + request.getAccessToken())) {
            throw new AppException(ResourceException.ACCESS_DENIED);
        }
        var JWTClaimsSet = jwtTokenProvider.verifyToken(request.getRefreshToken());
        if (JWTClaimsSet.isEmpty()) throw new AppException(ResourceException.INVALID_PAYLOAD);
        String userId = JWTClaimsSet.get().getSubject();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        TokenMetadataDTO tokenMetadata = new TokenMetadataDTO(user.getId(), user.getFullName(), new Date());
        var token = jwtTokenProvider.generateTokens(tokenMetadata);
        return AccountResponse.of(user, token);
    }

    /**
     * Authenticate an access token and retrieve user details.
     */
    public Optional<UserDetails> authenticateToken(String accessToken) {
        var claims = jwtTokenProvider.verifyToken(accessToken);

        if (claims.isEmpty()) {
            return Optional.empty();
        }

        String userId = claims.get().getSubject();
        Optional<User> userOpt = userRepository.findById(userId);

        return userOpt.map(user -> new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                "",
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        ));
    }

    public UserDetailDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == "anonymousUser") {
            return null;
        }
        var userDetails = (UserDetails) authentication.getPrincipal();
        var userDetailDTO = cacheService.get(USER_CACHE_KEY + userDetails.getUsername(), UserDetailDTO.class);
        if (userDetailDTO.isPresent()) return userDetailDTO.get();
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        if (optionalUser.isEmpty()) {
            return null;
        }
        User existingUser = optionalUser.get();
        return new UserDetailDTO(existingUser.getId(), existingUser.getRole().name(), existingUser.getFullName());
    }
}
