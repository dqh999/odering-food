package com.scanmeally.domain.store.exception;

import com.scanmeally.infrastructure.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum StoreException implements ExceptionCode {
    ENTITY_NOT_FOUND(404, "Store", "Store not found"),
    TABLE_NOT_AVAILABLE(409, "Store", "The table is not available");

    private final Integer code;
    private final String type;
    private final String message;
}