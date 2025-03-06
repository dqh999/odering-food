package com.scanmeally.domain.order.dataTransferObject.response;


import com.scanmeally.domain.order.model.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class OrderResponse {
    private String id;
    private String code;
    private String storeId;
    private String tableId;
    private String userId;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private Set<OrderItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
