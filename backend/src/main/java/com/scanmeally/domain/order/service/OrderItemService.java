package com.scanmeally.domain.order.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.order.dataTransferObject.OrderItemDTO;
import com.scanmeally.domain.order.model.OrderItem;
import com.scanmeally.domain.order.repository.OrderItemRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(final OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItemDTO> findAll() {
        final List<OrderItem> orderItems = orderItemRepository.findAll(Sort.by("id"));
        return orderItems.stream()
                .map(orderItem -> mapToDTO(orderItem, new OrderItemDTO()))
                .toList();
    }

    public OrderItemDTO get(final String id) {
        return orderItemRepository.findById(id)
                .map(orderItem -> mapToDTO(orderItem, new OrderItemDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = new OrderItem();
        mapToEntity(orderItemDTO, orderItem);
        return orderItemRepository.save(orderItem).getId();
    }

    public void update(final String id, final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(orderItemDTO, orderItem);
        orderItemRepository.save(orderItem);
    }

    public void delete(final String id) {
        orderItemRepository.deleteById(id);
    }

    private OrderItemDTO mapToDTO(final OrderItem orderItem, final OrderItemDTO orderItemDTO) {
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setOrderId(orderItem.getOrderId());
        orderItemDTO.setMenuItemId(orderItem.getMenuItemId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setPrice(orderItem.getPrice());
        orderItemDTO.setCreatedAt(orderItem.getCreatedAt());
        orderItemDTO.setUpdatedAt(orderItem.getUpdatedAt());
        return orderItemDTO;
    }

    private OrderItem mapToEntity(final OrderItemDTO orderItemDTO, final OrderItem orderItem) {
        orderItem.setOrderId(orderItemDTO.getOrderId());
        orderItem.setMenuItemId(orderItemDTO.getMenuItemId());
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setPrice(orderItemDTO.getPrice());
        orderItem.setCreatedAt(orderItemDTO.getCreatedAt());
        orderItem.setUpdatedAt(orderItemDTO.getUpdatedAt());
        return orderItem;
    }

}
