package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.model.StoreTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface StoreTableRepository extends JpaRepository<StoreTable, String> {
    Page<StoreTable> findAllByStoreId(String storeId, Pageable pageable);

    @Query("SELECT t.storeId, t.available FROM StoreTable t WHERE t.id = :tableId")
    Optional<Object[]> findStoreIdByTableId(@Param("tableId") String tableId);
}
