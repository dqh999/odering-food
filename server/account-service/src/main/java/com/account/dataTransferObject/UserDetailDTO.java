package com.account.dataTransferObject;

import java.util.List;

public record UserDetailDTO(
        String id,
        List<String> roles,
        String userName
) {
}
