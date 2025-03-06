package com.scanmeally.domain.order.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor @Getter
public class PopularMenuItemDTO {
    private String id;
    private String name;
    private long totalOrder;
    private BigDecimal revenue;
}
