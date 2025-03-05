package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.model.StoreTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TableRepository extends JpaRepository<StoreTable, String> {
    Page<StoreTable> findAllByStoreId(String storeId, Pageable pageable);
}
