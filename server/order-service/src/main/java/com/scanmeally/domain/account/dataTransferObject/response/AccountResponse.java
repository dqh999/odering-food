package com.scanmeally.domain.account.dataTransferObject.response;


import com.scanmeally.domain.account.dataTransferObject.TokenDTO;
import com.scanmeally.domain.account.model.User;

public record AccountResponse(
        UserResponse user,
        TokenDTO token
) {
    public static AccountResponse of(User user, TokenDTO token) {
        return new AccountResponse(UserResponse.of(user), token);
    }
}
