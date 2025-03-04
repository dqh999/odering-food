package com.scanmeally.domain.account.service;

import com.scanmeally.domain.account.component.JwtTokenProvider;
import com.scanmeally.domain.account.dataTransferObject.TokenMetadataDTO;
import com.scanmeally.domain.account.dataTransferObject.UserDetailDTO;
import com.scanmeally.domain.account.dataTransferObject.request.OAuth2LoginRequest;
import com.scanmeally.domain.account.dataTransferObject.response.AccountResponse;
import com.scanmeally.domain.account.dataTransferObject.response.OAuth2UrlResponse;
import com.scanmeally.domain.account.exception.AccountException;
import com.scanmeally.domain.account.model.User;
import com.scanmeally.domain.account.repository.UserRepository;
import com.scanmeally.domain.account.service.impl.GoogleOAuth2ServiceImpl;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.service.CacheService;
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

    /**
     * Refresh the access token using the refresh token.
     */
    public AccountResponse refreshToken(String refreshToken) {
        var JWTClaimsSet = jwtTokenProvider.verifyToken(refreshToken);
        if (JWTClaimsSet.isEmpty()) throw new AppException(AccountException.REFRESH_TOKEN_INVALID);
        String userId = JWTClaimsSet.get().getSubject();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(AccountException.USER_NOT_FOUND));
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
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(AccountException.INVALID_CREDENTIALS);
        }
        var userDetails = (UserDetails) authentication.getPrincipal();
        var userDetailDTO = cacheService.get(USER_CACHE_KEY + userDetails.getUsername(), UserDetailDTO.class);
        if (userDetailDTO.isPresent()) return userDetailDTO.get();
        User existingUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new AppException(AccountException.USER_NOT_FOUND));
        return new UserDetailDTO(existingUser.getId(), existingUser.getRole().name(), existingUser.getFullName());
    }
}
