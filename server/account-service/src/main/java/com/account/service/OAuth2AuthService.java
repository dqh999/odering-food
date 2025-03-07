package com.account.domain.account.service;


import com.account.domain.account.dataTransferObject.response.OAuth2UrlResponse;
import com.account.domain.account.model.User;

public interface OAuth2AuthService {
    OAuth2UrlResponse getAuthorizationUrl();
    User authenticateUser(String code);
}
