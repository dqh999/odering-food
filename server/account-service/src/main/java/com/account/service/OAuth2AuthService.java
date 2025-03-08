package com.account.service;


import com.account.dataTransferObject.response.OAuth2UrlResponse;
import com.account.model.User;

public interface OAuth2AuthService {
    OAuth2UrlResponse getAuthorizationUrl();
    User authenticateUser(String code);
}
