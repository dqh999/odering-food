package com.scanmeally.api.order;

import com.scanmeally.domain.order.dataTransferObject.OrderItemDTO;
import com.scanmeally.domain.order.service.OrderItemService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/orderItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderItemResource {

    private final OrderItemService orderItemService;

    public OrderItemResource(final OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public ResponseEntity<List<OrderItemDTO>> getAllOrderItems() {
        return ResponseEntity.ok(orderItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemDTO> getOrderItem(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(orderItemService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createOrderItem(
            @RequestBody  final OrderItemDTO orderItemDTO) {
        final String createdId = orderItemService.create(orderItemDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrderItem(@PathVariable(name = "id") final String id,
            @RequestBody  final OrderItemDTO orderItemDTO) {
        orderItemService.update(id, orderItemDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteOrderItem(@PathVariable(name = "id") final String id) {
        orderItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
