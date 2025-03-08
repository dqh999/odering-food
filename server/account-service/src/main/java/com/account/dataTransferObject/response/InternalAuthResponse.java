package com.account.dataTransferObject.response;

import java.util.List;

public record InternalAuthResponse(
        String id,
        String userName,
        List<String> roles
) {
}
