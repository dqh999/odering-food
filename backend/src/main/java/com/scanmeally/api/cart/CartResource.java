package com.scanmeally.api.cart;

import com.scanmeally.domain.cart.Cart;
import com.scanmeally.domain.cart.CartItem;
import com.scanmeally.domain.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
class CartResource {
    private final CartService cartService;

    @PutMapping("/{sessionId}")
    public ResponseEntity<String> updateCart(
            @PathVariable(name = "sessionId") final String sessionId,
            @RequestBody final CartItem cartItem
    ) {
        cartService.addItemToCart(sessionId, cartItem);
        return ResponseEntity.ok("Cart updated for session: " + sessionId);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<Cart> getCart(@PathVariable(name = "sessionId") final String sessionId) {
        return cartService.getCart(sessionId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{sessionId}/{itemId}")
    public ResponseEntity<String> removeItem(
            @PathVariable String sessionId,
            @PathVariable String itemId
    ) {
        cartService.removeItemFromCart(sessionId, itemId);
        return ResponseEntity.ok("Item removed from cart");
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<String> clearCart(@PathVariable String sessionId) {
        cartService.clearCart(sessionId);
        return ResponseEntity.ok("Cart cleared");
    }
}
