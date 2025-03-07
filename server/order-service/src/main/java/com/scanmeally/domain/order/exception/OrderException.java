package com.scanmeally.domain.order.exception;

import com.scanmeally.infrastructure.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderException implements ExceptionCode {
    INVALID_ORDER_STATUS_TRANSITION(401, "ORDER", "Invalid order status transition.");

    private final Integer code;
    private final String type;
    private final String message;
}
