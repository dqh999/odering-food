package com.scanmeally.domain.order.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.order.dataTransferObject.OrderDTO;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.domain.order.repository.OrderRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(final OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDTO> findAll() {
        final List<Order> orders = orderRepository.findAll(Sort.by("id"));
        return orders.stream()
                .map(order -> mapToDTO(order, new OrderDTO()))
                .toList();
    }

    public OrderDTO get(final String id) {
        return orderRepository.findById(id)
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final OrderDTO orderDTO) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        return orderRepository.save(order).getId();
    }

    public void update(final String id, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final String id) {
        orderRepository.deleteById(id);
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setId(order.getId());
        orderDTO.setStoreId(order.getStoreId());
        orderDTO.setTableId(order.getTableId());
        orderDTO.setUserId(order.getUserId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setUpdatedAt(order.getUpdatedAt());
        return orderDTO;
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setStoreId(orderDTO.getStoreId());
        order.setTableId(orderDTO.getTableId());
        order.setUserId(orderDTO.getUserId());
        order.setStatus(orderDTO.getStatus());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setCreatedAt(orderDTO.getCreatedAt());
        order.setUpdatedAt(orderDTO.getUpdatedAt());
        return order;
    }

}
