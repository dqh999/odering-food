package com.scanmeally.domain.order.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor @Getter
@Setter
public class OrderStatisticsDTO {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long completedOrders;
    private long activeOrders;
}
