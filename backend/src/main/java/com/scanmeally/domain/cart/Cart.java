package com.scanmeally.domain.cart;

import lombok.Data;

import java.util.Set;

@Data
public class Cart {
    private String id;
    private String sessionId;
    private String userId;
    private Set<CartItem> items;
}
