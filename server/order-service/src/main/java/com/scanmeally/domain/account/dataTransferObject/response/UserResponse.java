package com.scanmeally.domain.account.dataTransferObject.response;


import com.scanmeally.domain.account.model.User;

public record UserResponse(
        String id,
        String fullName,
        String avatarUrl
) {
    public static UserResponse of(User user) {
        return new UserResponse(user.getId(), user.getFullName(), user.getAvatarUrl());
    }
}
