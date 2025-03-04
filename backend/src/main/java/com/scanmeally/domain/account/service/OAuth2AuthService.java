package com.scanmeally.domain.account.service;


import com.scanmeally.domain.account.dataTransferObject.response.OAuth2UrlResponse;
import com.scanmeally.domain.account.model.User;

public interface OAuth2AuthService {
    OAuth2UrlResponse getAuthorizationUrl();
    User authenticateUser(String code);
}
