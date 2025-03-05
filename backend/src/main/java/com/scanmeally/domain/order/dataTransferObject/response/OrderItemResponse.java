package com.scanmeally.domain.order.dataTransferObject.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemResponse {
    private String id;
    private String menuItemId;
    private Integer quantity;
    private BigDecimal price;
}