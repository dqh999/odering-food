package com.scanmeally.domain.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {
    private String id;
    private String cartId;
    private String menuItemId;
    private String menuItemName;
    private int quantity;
    private BigDecimal price;
}
