package com.scanmeally.infrastructure.exception;

public interface ExceptionCode {
    Integer getCode();
    String getType();
    String getMessage();
}
