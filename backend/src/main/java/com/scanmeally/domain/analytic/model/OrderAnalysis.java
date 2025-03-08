package com.scanmeally.domain.analytic.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collation = "order_analysis")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderAnalysis {
    @Id
    private String id;
    private String storeId;
    private LocalDate analysisDate;
    private int totalOrders;
    private BigDecimal totalRevenue;
    private int activeOrders;
    private int completedOrders;
    private BigDecimal growthPercentageRevenue;
    private BigDecimal growthPercentageOrders;
}
