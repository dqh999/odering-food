package com.scanmeally.domain.cart;

import com.scanmeally.domain.order.model.OrderPricing;
import jakarta.persistence.Embedded;
import lombok.*;

import java.util.Set;


@Data
@Builder(toBuilder = true)
@AllArgsConstructor
public class Cart {
    private String id;
    private String sessionId;
    private String userId;
    private String storeId;
    private String tableId;
    private Set<CartItem> cartItems;
    @Embedded
    private OrderPricing pricing;

    public Cart() {
        this.pricing = new OrderPricing();
    }

    public Cart(String sessionId) {
        this.sessionId = sessionId;
        this.pricing = new OrderPricing();
    }
}