package com.scanmeally.domain.menu.exception;

import com.scanmeally.infrastructure.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MenuException implements ExceptionCode {
    UNEXPECTED_ERROR(500, "UNEXPECTED_ERROR", "Unexpected menu-related error.");

    private final Integer code;
    private final String type;
    private final String message;
}
