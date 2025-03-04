package com.scanmeally.domain.order.repository;

import com.scanmeally.domain.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
}
