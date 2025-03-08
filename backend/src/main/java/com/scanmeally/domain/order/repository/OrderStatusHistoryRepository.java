package com.scanmeally.domain.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scanmeally.domain.order.model.OrderStatusHistory;

public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, String> {
}
