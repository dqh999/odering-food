package com.account.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.account.dataTransferObject.response.OAuth2UrlResponse;
import com.account.exception.AccountException;
import com.account.model.LoginType;
import com.account.model.User;
import com.account.model.UserRole;
import com.account.service.OAuth2AuthService;
import com.account.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuth2ServiceImpl implements OAuth2AuthService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.registration.google.scope}")
    private List<String> googleScope;

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String googleUserInfoUri;

    @Override
    public OAuth2UrlResponse getAuthorizationUrl() {
        log.info("Generating Google OAuth2 authorization URL...");
        String authorizationUrl = new GoogleAuthorizationCodeRequestUrl(
                googleClientId,
                googleRedirectUri,
                googleScope
        ).build();
        log.info("Generated Google OAuth2 authorization URL: {}", authorizationUrl);
        return new OAuth2UrlResponse(LoginType.GOOGLE.name(), authorizationUrl);
    }

    @Override
    public User authenticateUser(String code) {
        log.info("Starting authentication process with Google OAuth2. Code received: {}", code);

        try {
            log.info("Requesting access token from Google...");

            String accessToken = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(), new GsonFactory(),
                    googleClientId, googleClientSecret,
                    code, googleRedirectUri
            ).execute().getAccessToken();

            log.info("Successfully obtained access token: {}", accessToken);

            log.info("Fetching user information from Google API...");
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getInterceptors().add((request, body, execution) -> {
                request.getHeaders().set("Authorization", "Bearer " + accessToken);
                return execution.execute(request, body);
            });

            ResponseEntity<String> response = restTemplate.getForEntity(googleUserInfoUri, String.class);
            log.info("Received response from Google user info API: {}", response.getBody());

            Map<String, Object> userInfo = new ObjectMapper().readValue(response.getBody(), new TypeReference<>() {});

            log.info("Extracted user information: {}", userInfo);

            User user = User.builder()
                    .providerName(LoginType.GOOGLE.name())
                    .providerUserId((String) userInfo.get("sub"))
                    .email((String) userInfo.get("email"))
                    .fullName((String) userInfo.get("name"))
                    .avatarUrl((String) userInfo.get("picture"))
                    .role(UserRole.USER)
                    .build();

            log.info("User authentication successful: {}", user);

            return user;
        } catch (IOException e) {
            log.error("Error during authentication process with Google OAuth2", e);
            throw new AppException(AccountException.INVALID_CREDENTIALS);
        }
    }
}
