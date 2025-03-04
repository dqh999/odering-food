package com.scanmeally.domain.cart;

import com.scanmeally.infrastructure.service.CacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CacheService cacheService;
    private static final String CART_PREFIX = "cart:";
    private static final Duration CACHE_EXPIRATION = Duration.ofHours(1);
    private static final int MAX_ITEMS = 100;
    private static final int MAX_QUANTITY_PER_ITEM = 99;

    public void addItemToCart(String sessionId, CartItem cartItem) {
        String cartKey = CART_PREFIX + sessionId;
        Cart cart = cacheService.get(cartKey, Cart.class).orElse(new Cart());
        cart.setSessionId(sessionId);

        if (cart.getItems().size() >= MAX_ITEMS) {
            throw new IllegalStateException("Cannot add more than " + MAX_ITEMS + " items to the cart.");
        }

        boolean itemExists = false;
        for (CartItem item : cart.getItems()) {
            if (item.getMenuItemId().equals(cartItem.getMenuItemId())) {
                int newQuantity = Math.min(item.getQuantity() + cartItem.getQuantity(), MAX_QUANTITY_PER_ITEM);
                item.setQuantity(newQuantity);
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            cartItem.setQuantity(Math.min(cartItem.getQuantity(), MAX_QUANTITY_PER_ITEM));
            cart.getItems().add(cartItem);
        }

        cacheService.set(cartKey, cart, CACHE_EXPIRATION);
    }

    public Optional<Cart> getCart(String sessionId) {
        return cacheService.get(CART_PREFIX + sessionId, Cart.class);
    }

    public void removeItemFromCart(String sessionId, String itemId) {
        String cartKey = CART_PREFIX + sessionId;
        Cart cart = cacheService.get(cartKey, Cart.class).orElse(new Cart());

        cart.getItems().removeIf(item -> item.getMenuItemId().equals(itemId));

        cacheService.set(cartKey, cart, CACHE_EXPIRATION);
    }

    public void clearCart(String sessionId) {
        cacheService.delete(CART_PREFIX + sessionId);
    }
}
