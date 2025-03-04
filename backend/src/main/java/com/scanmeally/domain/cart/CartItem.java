package com.scanmeally.domain.cart;

import lombok.Data;

@Data
public class CartItem {
    private String id;
    private String cartId;
    private String menuItemId;
    private int quantity;
}
