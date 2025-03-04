package com.scanmeally.domain.account.dataTransferObject;


import java.util.Date;

public record TokenMetadataDTO(
        String userId,
        String userName,
        Date issuedAt
) {
}
