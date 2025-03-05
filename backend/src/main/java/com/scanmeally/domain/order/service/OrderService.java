package com.scanmeally.domain.order.service;

import com.scanmeally.domain.order.dataTransferObject.request.OrderRequest;
import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.domain.cart.CartService;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.exception.OrderException;
import com.scanmeally.domain.order.mapper.OrderMapper;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.domain.order.model.OrderItem;
import com.scanmeally.domain.order.model.OrderStatus;
import com.scanmeally.domain.order.repository.OrderRepository;
import com.scanmeally.domain.order.repository.OrderItemRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import com.scanmeally.infrastructure.service.WSService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final CartService cartService;
    private final WSService wsService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;

    private static final String STORE_ORDER_TOPIC = "/store/%s/order";


    public PageResponse<OrderResponse> getAllOrdersByStore(final String storeId, final int page, final int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "createdAt");
        Page<Order> orders = orderRepository.findAllOrdersByStoreId(storeId, pageable);
        var response = orders.map(orderMapper::toResponse);
        return PageResponse.build(response);
    }

    public OrderResponse get(final String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        return orderMapper.toResponse(order);
    }

    @Transactional
    public OrderResponse checkout(final String tableId, OrderRequest request) {
        var cart = cartService.getCart(tableId);
        if (cart.getCartItems().isEmpty()) {
            throw new AppException(ResourceException.UNEXPECTED_ERROR);
        }
        Order newOrder = Order.builder()
                .tableId(cart.getTableId())
                .pricing(cart.getPricing())
                .userNotes(request.getUserNotes())
                .status(OrderStatus.PENDING)
                .build();
        Set<OrderItem> orderItems = cart.getCartItems().stream()
                .map(cartItem -> OrderItem.builder()
                        .order(newOrder)
                        .menuItemId(cartItem.getMenuItemId())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getPrice())
                        .build())
                .collect(Collectors.toSet());
        newOrder.setOrderItems(orderItems);
        Order saved = orderRepository.save(newOrder);
        cartService.clear(tableId);
        var response = orderMapper.toResponse(saved);
        wsService.sendMessage(STORE_ORDER_TOPIC.formatted(cart.getStoreId()), response);
        return response;
    }

    @Transactional
    public OrderResponse updateOrderStatus(String orderId, OrderStatus newStatus) {
        String storeId = orderRepository.findStoreIdByOrderId(orderId)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        if (!order.getStatus().isValidTransition(newStatus)) {
            throw new AppException(OrderException.INVALID_ORDER_STATUS_TRANSITION);
        }
        order.setStatus(newStatus);
        Order saved = orderRepository.save(order);
        var response = orderMapper.toResponse(saved);
        wsService.sendMessage(STORE_ORDER_TOPIC.formatted(storeId), response);
        return response;
    }

    public void delete(final String id) {
        orderItemRepository.deleteByOrderId(id);
        orderRepository.deleteById(id);
    }
}
