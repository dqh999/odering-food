package com.account.dataTransferObject.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2UserResponse {
    private String id;
    private String email;
    private String name;
    private String picture;
}