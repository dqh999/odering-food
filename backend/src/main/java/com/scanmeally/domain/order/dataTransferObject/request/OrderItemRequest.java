package com.scanmeally.domain.order.dataTransferObject.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemRequest {
    private String menuItemId;
    private Integer quantity;
    private BigDecimal price;
}