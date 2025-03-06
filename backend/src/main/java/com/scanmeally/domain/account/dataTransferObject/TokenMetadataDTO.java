package com.scanmeally.domain.account.dataTransferObject;


import java.util.Date;
import java.util.List;

public record TokenMetadataDTO(
        String userId,
        String userName,
        Date issuedAt,
        List<String> roles
) {
}
