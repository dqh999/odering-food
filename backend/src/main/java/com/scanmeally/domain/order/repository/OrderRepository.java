package com.scanmeally.domain.order.repository;

import com.scanmeally.domain.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findAllOrdersByStoreId(String storeId, Pageable pageable);
}
