package com.scanmeally.domain.order.service;

import com.scanmeally.domain.order.dataTransferObject.request.OrderRequest;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.mapper.OrderMapper;
import com.scanmeally.domain.order.mapper.OrderItemMapper;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.domain.order.model.OrderItem;
import com.scanmeally.domain.order.repository.OrderRepository;
import com.scanmeally.domain.order.repository.OrderItemRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;
    private final OrderItemMapper orderItemMapper;

    public Page<OrderResponse> findAllByStoreId(final String storeId, final int page, final int pageSize) {
        Pageable pageable = PageRequest.of(page-1, pageSize, Sort.Direction.DESC, "id");
        Page<Order> orders = orderRepository.findAllOrdersByStoreId(storeId,pageable);
        return orders.map(orderMapper::toResponse);
    }

    public OrderResponse get(final String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        return orderMapper.toResponse(order);
    }

    @Transactional
    public OrderResponse create(final OrderRequest orderRequest) {
        // Lưu Order
        Order order = orderMapper.toEntity(orderRequest);
        Order savedOrder = orderRepository.save(order);

        // Lưu danh sách OrderItem
        List<OrderItem> orderItems = orderRequest.getItems().stream()
                .map(itemRequest -> {
                    OrderItem orderItem = orderItemMapper.toEntity(itemRequest);
                    orderItem.setOrderId(savedOrder.getId());
                    return orderItem;
                }).toList();
        orderItemRepository.saveAll(orderItems);

        return orderMapper.toResponse(savedOrder);
    }

    @Transactional
    public OrderResponse update(final String id, final OrderRequest orderRequest) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));

        // Cập nhật Order
        order.setStoreId(orderRequest.getStoreId());
        order.setTableId(orderRequest.getTableId());
        order.setUserId(orderRequest.getUserId());
        order.setTotalPrice(orderRequest.getTotalPrice());
        Order updatedOrder = orderRepository.save(order);

        // Xóa OrderItem cũ và thêm OrderItem mới
        orderItemRepository.deleteByOrderId(id);
        List<OrderItem> orderItems = orderRequest.getItems().stream()
                .map(itemRequest -> {
                    OrderItem orderItem = orderItemMapper.toEntity(itemRequest);
                    orderItem.setOrderId(id);
                    return orderItem;
                }).toList();
        orderItemRepository.saveAll(orderItems);
        return orderMapper.toResponse(updatedOrder);
    }

    public void delete(final String id) {
        orderItemRepository.deleteByOrderId(id);
        orderRepository.deleteById(id);
    }
}
