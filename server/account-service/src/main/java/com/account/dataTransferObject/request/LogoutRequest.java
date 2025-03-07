package com.account.domain.account.dataTransferObject.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor @Getter
public class LogoutRequest {
    private String authorizationHeader;
}
