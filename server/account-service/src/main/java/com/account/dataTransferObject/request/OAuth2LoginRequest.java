package com.account.dataTransferObject.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class OAuth2LoginRequest {
    private String provider; // "google" | "facebook"
    private String code;
}
