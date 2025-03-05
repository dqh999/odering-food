package com.scanmeally.domain.order.dataTransferObject.response;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderResponse {
    private String id;
    private String storeId;
    private String tableId;
    private String userId;
    private String status;
    private BigDecimal totalPrice;
    private List<OrderItemResponse> items;
}
