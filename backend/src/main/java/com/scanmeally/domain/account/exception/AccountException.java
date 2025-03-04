package com.scanmeally.domain.account.exception;

import com.scanmeally.infrastructure.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AccountException implements ExceptionCode {
    INVALID_CREDENTIALS(401, "INVALID_CREDENTIALS", "Invalid username or password."),
    ACCOUNT_LOCKED(403, "ACCOUNT_LOCKED", "Account is locked."),
    TOKEN_EXPIRED(401, "TOKEN_EXPIRED", "Token has expired."),
    TOKEN_INVALID(401, "TOKEN_INVALID", "Invalid token."),
    REFRESH_TOKEN_EXPIRED(401, "REFRESH_TOKEN_EXPIRED", "Refresh token has expired."),
    REFRESH_TOKEN_INVALID(401, "REFRESH_TOKEN_INVALID", "Invalid refresh token."),
    INVALID_OAUTH2_TOKEN(400, "INVALID_OAUTH2_TOKEN", "Invalid OAuth2 token."),
    OAUTH_PROVIDER_NOT_SUPPORTED(400, "OAUTH_PROVIDER_NOT_SUPPORTED", "OAuth provider not supported."),
    EMAIL_ALREADY_REGISTERED(409, "EMAIL_ALREADY_REGISTERED", "Email is already registered.");
    private final Integer code;
    private final String type;
    private final String message;
}