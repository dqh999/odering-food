package com.scanmeally.domain.order.repository;

import com.scanmeally.domain.order.dataTransferObject.OrderCountAndRevenueDTO;
import com.scanmeally.domain.order.dataTransferObject.OrderStatisticsDTO;
import com.scanmeally.domain.order.dataTransferObject.PopularMenuItemDTO;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.domain.order.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("select o from Order  o " +
            "join StoreTable st on o.tableId = st.id " +
            "where st.storeId = :storeId")
    Page<Order> findAllOrdersByStoreId(@Param("storeId") String storeId, Pageable pageable);

    @Query("select st.storeId from Order o " +
            "join StoreTable st on o.tableId = st.id " +
            "where o.id = :orderId")
    Optional<String> findStoreIdByOrderId(@Param("orderId") String orderId);


    @Query("select new com.scanmeally.domain.order.dataTransferObject.OrderStatisticsDTO(" +
            "count(o.id), " +                // Tổng số đơn
            "sum(o.pricing.totalPrice), " +  // Tổng doanh thu
            "count(case when o.status = 'COMPLETED' then 1 end), " +  // Số đơn đã hoàn thành
            "count(case when o.status in :activeStatuses then 1 end)) " +  // Số đơn đang active
            "from Order o " +
            "join StoreTable st on o.tableId = st.id " +
            "where st.storeId = :storeId " +
            "and DATE(o.createdAt) = :createdAt")
    Optional<OrderStatisticsDTO> getOrderStatistics(@Param("storeId") String storeId,
                                                    @Param("createdAt") LocalDate createdAt,
                                                    @Param("activeStatuses") List<OrderStatus> activeStatuses);

    @Query("select new com.scanmeally.domain.order.dataTransferObject.OrderCountAndRevenueDTO(" +
            "count(o), " +
            "sum(o.pricing.totalPrice)) " +
            "from Order o " +
            "join StoreTable st on o.tableId = st.id " +
            "where st.storeId = :storeId " +
            "and DATE(o.createdAt) = :createdAt")
    Optional<OrderCountAndRevenueDTO> getOrderCountAndRevenue(@Param("storeId") String storeId,
                                                              @Param("createdAt") LocalDate createdAt);


    @Query("select new com.scanmeally.domain.order.dataTransferObject.PopularMenuItemDTO" +
            "(oi.menuItemId, mi.name, sum(oi.quantity), sum(oi.price)) " +
            "from OrderItem oi " +
            "join MenuItem mi on oi.menuItemId = mi.id " +
            "where oi.order.createdAt >= :startDate " +
            "and oi.order.createdAt <= :endDate " +
            "group by oi.menuItemId, mi.name " +
            "order by sum(oi.price) desc")
    Page<PopularMenuItemDTO> getPopularMenuItemsByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable
    );
}
