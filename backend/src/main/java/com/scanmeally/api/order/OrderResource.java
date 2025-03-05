package com.scanmeally.api.order;

import com.scanmeally.domain.order.dataTransferObject.request.OrderRequest;
import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.model.OrderStatus;
import com.scanmeally.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderResource {

    private final OrderService orderService;

    @PostMapping("/checkout/{tableId}")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @PathVariable String tableId,
            @RequestBody OrderRequest request
    ) {
        var response = orderService.checkout(tableId, request);
        return ApiResponse.<OrderResponse>build().withData(response).toEntity();
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getAllOrdersByStore(
            @RequestParam(name = "storeId") String storeId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = orderService.getAllOrdersByStore(storeId, page, pageSize);
        return ApiResponse.<PageResponse<OrderResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable String id) {
        final var response = orderService.get(id);
        return ApiResponse.<OrderResponse>build().withData(response).toEntity();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable String id,
            @RequestParam OrderStatus status
    ) {
        var response = orderService.updateOrderStatus(id, status);
        return ApiResponse.<OrderResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
