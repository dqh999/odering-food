package com.account.domain.account.dataTransferObject.response;


import com.account.domain.account.dataTransferObject.TokenDTO;
import com.account.domain.account.model.User;

public record AccountResponse(
        UserResponse user,
        TokenDTO token
) {
    public static AccountResponse of(User user, TokenDTO token) {
        return new AccountResponse(UserResponse.of(user), token);
    }
}
