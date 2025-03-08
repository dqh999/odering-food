package com.scanmeally.domain.store.dataTransferObject;

import com.scanmeally.domain.order.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderStoreTableDTO {
    private String id;
    private String tableNumber;
    private Boolean available;
    private OrderStatus orderStatus;
    private String currentOrderCode;
}