package com.scanmeally.infrastructure.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final ExceptionCode exceptionCode;

    public AppException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
