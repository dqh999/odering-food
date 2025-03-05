package com.scanmeally.domain.cart;

import com.scanmeally.domain.account.service.AccountService;
import com.scanmeally.domain.menu.service.MenuService;
import com.scanmeally.domain.order.model.OrderPricing;
import com.scanmeally.domain.store.service.TableService;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import com.scanmeally.infrastructure.service.CacheService;
import com.scanmeally.infrastructure.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {
    private final MenuService menuService;
    private final TableService tableService;
    private final AccountService accountService;
    private final CacheService cacheService;
    private final SessionService sessionService;
    private static final String CART_PREFIX_CACHE = "cart:table:%s:session:%s";
    private static final Duration CART_EXPIRATION_TIME = Duration.ofHours(1);

    public Cart getCart(String tableId) {
        String sessionId = sessionService.getSessionId();
        String keyInCache = this.getKeyCartInCache(tableId, sessionId);
        return cacheService.get(keyInCache, Cart.class)
                .orElseGet(() -> {
                    String storeId = tableService.getStoreIdByTableId(tableId);
                    var currentUser = accountService.getCurrentUser();
                    Cart newCart = Cart.builder()
                            .id(UUID.randomUUID().toString())
                            .sessionId(sessionId)
                            .userId(currentUser != null ? currentUser.id() : null)
                            .storeId(storeId)
                            .tableId(tableId)
                            .cartItems(new HashSet<>())
                            .pricing(new OrderPricing())
                            .build();
                    cacheService.set(keyInCache, newCart, CART_EXPIRATION_TIME);
                    return newCart;
                });
    }

    @Transactional
    public Cart addItem(String tableId, CartItemRequest request) {
        String sessionId = sessionService.getSessionId();
        Cart cart = getCart(tableId);
        Set<CartItem> items = cart.getCartItems();
        Optional<CartItem> existingItem = items.stream()
                .filter(item -> item.getMenuItemId().equals(request.getItemId()))
                .findFirst();
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = CartItem.builder()
                    .id(UUID.randomUUID().toString())
                    .menuItemId(request.getItemId())
                    .quantity(request.getQuantity())
                    .build();
            items.add(newItem);
        }
        updateCartTotals(cart);
        cacheService.set(this.getKeyCartInCache(tableId, sessionId), cart, CART_EXPIRATION_TIME);
        return cart;
    }

    @Transactional
    public Cart updateItemQuantity(String tableId, CartItemRequest request) {
        String sessionId = sessionService.getSessionId();
        Cart cart = getCart(tableId);
        for (CartItem item : cart.getCartItems()) {
            if (item.getMenuItemId().equals(request.getItemId())) {
                item.setQuantity(request.getQuantity());
                break;
            }
        }

        updateCartTotals(cart);
        cacheService.set(this.getKeyCartInCache(tableId, sessionId), cart, CART_EXPIRATION_TIME);
        return cart;
    }

    @Transactional
    public Cart removeItem(String tableId, String itemId) {
        String sessionId = sessionService.getSessionId();
        Cart cart = getCart(tableId);
        cart.getCartItems().removeIf(item -> item.getMenuItemId().equals(itemId));

        updateCartTotals(cart);
        cacheService.set(this.getKeyCartInCache(tableId, sessionId), cart, CART_EXPIRATION_TIME);
        return cart;
    }

    public void clear(String tableId) {
        String sessionId = sessionService.getSessionId();
        cacheService.delete(this.getKeyCartInCache(tableId, sessionId));
    }

    private void updateCartTotals(Cart cart) {
        OrderPricing pricing = cart.getPricing();

        BigDecimal subtotal = cart.getCartItems().stream()
                .map(item -> getItemPrice(cart.getStoreId(), item.getMenuItemId()).multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(pricing.getTaxRate()).divide(BigDecimal.valueOf(100)));
        BigDecimal serviceFee = subtotal.multiply(BigDecimal.valueOf(pricing.getServiceFeeRate()).divide(BigDecimal.valueOf(100)));
        BigDecimal total = subtotal.add(tax).add(serviceFee).add(pricing.getShippingFee()).subtract(pricing.getDiscount());

        pricing.setSubtotal(subtotal);
        pricing.setTax(tax);
        pricing.setServiceFee(serviceFee);
        pricing.setTotalPrice(total);
    }

    private BigDecimal getItemPrice(String storeId, String itemId) {
        var menuItemPrice = menuService.getPriceAndAvailability(storeId, itemId);
        if (menuItemPrice.available()) return menuItemPrice.price();
        throw new AppException(ResourceException.UNEXPECTED_ERROR);
    }

    private String getKeyCartInCache(String tableId, String sessionId) {
        return CART_PREFIX_CACHE.formatted(tableId, sessionId);
    }
}
