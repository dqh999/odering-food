package com.scanmeally.domain.cart;

import lombok.Data;

@Data
public class CartItemRequest {
    private String itemId;
    private int quantity;
}
