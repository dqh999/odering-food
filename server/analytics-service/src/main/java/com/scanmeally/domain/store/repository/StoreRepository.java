package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.model.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface StoreRepository extends JpaRepository<Store, String> {
    Page<Store> findAllByBrandId(String brandId, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " +
            "FROM StoreTable t WHERE t.storeId = :storeId AND t.id = :tableId AND t.available = TRUE")
    Boolean existsByStoreIdAndTableIdAndAvailable(@Param("storeId") String storeId,
                                                  @Param("tableId") String tableId);
}
