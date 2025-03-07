package com.scanmeally.domain.order.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class OrderCountAndRevenueDTO {
    private long totalOrders;
    private BigDecimal totalRevenue;
}