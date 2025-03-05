package com.scanmeally.domain.order.dataTransferObject.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private String storeId;
    private String tableId;
    private String userId;
    private BigDecimal totalPrice;
    private List<OrderItemRequest> items;
}