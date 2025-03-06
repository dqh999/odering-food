package com.scanmeally.api.cart;

import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.cart.Cart;
import com.scanmeally.domain.cart.CartItemRequest;
import com.scanmeally.domain.cart.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart API")
public class CartController {
    private final CartService cartService;

    @GetMapping("/{tableId}")
    public ResponseEntity<ApiResponse<Cart>> getCart(@PathVariable String tableId) {
        var response = cartService.getCart(tableId);
        return ApiResponse.<Cart>build().withData(response).toEntity();
    }

    @PostMapping("/{tableId}")
    public ResponseEntity<ApiResponse<Cart>> addItem(@PathVariable String tableId, @RequestBody CartItemRequest request) {
        var response = cartService.addItem(tableId,request);
        return ApiResponse.<Cart>build().withData(response).toEntity();
    }

    @PutMapping("/update/{tableId}")
    public ResponseEntity<ApiResponse<Cart>> updateItem(@PathVariable String tableId, @RequestBody CartItemRequest request) {
        var response = cartService.updateItemQuantity(tableId,request);
        return ApiResponse.<Cart>build().withData(response).toEntity();
    }

    @DeleteMapping("/remove/{tableId}")
    public ResponseEntity<ApiResponse<Cart>> removeItem(@PathVariable String tableId, @RequestParam String itemId) {
        var response = cartService.removeItem(itemId, tableId);
        return ApiResponse.<Cart>build().withData(response).toEntity();
    }

    @DeleteMapping("/clear/{tableId}")
    public ResponseEntity<ApiResponse<Void>> clearCart(@PathVariable String tableId) {
        cartService.clear(tableId);
        return ApiResponse.<Void>build().withMessage("Cart cleared successfully").toEntity();
    }
}
