package com.scanmeally.domain.order.repository;

import com.scanmeally.domain.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("select o from Order o " +
            "join StoreTable st on o.tableId = st.id " +
            "join Store s on st.storeId = s.id " +
            "where s.brandId = :brandId")
    Page<Order> findAllOrdersByBrandId(@Param("brandId") String brandId, Pageable pageable);

    @Query("select o from Order  o " +
            "join StoreTable st on o.tableId = st.id " +
            "where st.storeId = :storeId")
    Page<Order> findAllOrdersByStoreId(@Param("storeId") String storeId, Pageable pageable);

    @Query("select st.storeId from Order o " +
            "join StoreTable st on o.tableId = st.id " +
            "where o.id = :orderId")
    Optional<String> findStoreIdByOrderId(@Param("orderId") String orderId);
}
