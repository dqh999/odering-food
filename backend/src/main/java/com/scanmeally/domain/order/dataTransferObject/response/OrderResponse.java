package com.scanmeally.domain.order.dataTransferObject.response;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class OrderResponse {
    private String id;
    private String storeId;
    private String tableId;
    private String userId;
    private String status;
    private BigDecimal totalPrice;
    private Set<OrderItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
