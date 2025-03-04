package com.scanmeally.domain.order.repository;

import com.scanmeally.domain.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, String> {
}
