package com.account.dataTransferObject.response;


import com.account.dataTransferObject.TokenDTO;
import com.account.model.User;

public record AccountResponse(
        UserResponse user,
        TokenDTO token
) {
    public static AccountResponse of(User user, TokenDTO token) {
        return new AccountResponse(UserResponse.of(user), token);
    }
}
