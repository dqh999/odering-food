package com.scanmeally.domain.account.dataTransferObject;

public record UserDetailDTO(
        String id,
        String role,
        String userName
) {
}
