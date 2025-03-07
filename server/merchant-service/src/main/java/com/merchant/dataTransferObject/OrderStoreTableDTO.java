package com.merchant.dataTransferObject;

import com.merchant.domain.order.model.OrderStatus;
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