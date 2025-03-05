package com.scanmeally.api.order;

import com.scanmeally.application.dataTransferObject.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.order.dataTransferObject.request.OrderRequest;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderResource {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getAllOrders(
            @RequestParam(name = "storeId") String storeId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = orderService.findAllByStoreId(storeId,page, pageSize);
        final PageResponse<OrderResponse> pageResponse = PageResponse.<OrderResponse>builder()
                .totalElements((int) response.getTotalElements())
                .totalPages(response.getTotalPages())
                .currentPage(response.getNumber() + 1)
                .pageSize(response.getSize())
                .data(response.getContent())
                .hasNext(response.hasNext())
                .hasPrevious(response.hasPrevious())
                .build();
        return ApiResponse.<PageResponse<OrderResponse>>build().withData(pageResponse).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable String id) {
        final var response = orderService.get(id);
        return ApiResponse.<OrderResponse>build().withData(response).toEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(@RequestBody OrderRequest orderRequest) {
        final var response = orderService.create(orderRequest);
        return ApiResponse.<OrderResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrder(@PathVariable String id, @RequestBody OrderRequest orderRequest) {
        orderService.update(id, orderRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
