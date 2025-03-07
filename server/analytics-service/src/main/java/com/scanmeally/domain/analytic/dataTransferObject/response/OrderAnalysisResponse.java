package com.scanmeally.domain.analytic.dataTransferObject.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data @AllArgsConstructor
public class OrderAnalysisResponse {
    private long totalOrders;
    private BigDecimal growthPercentOrders;
    private long totalActiveOrders;
    private long totalCompletedOrders;
    private BigDecimal totalRevenue;
    private BigDecimal growthPercentageRevenue;
}
