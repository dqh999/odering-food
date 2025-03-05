package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.model.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StoreRepository extends JpaRepository<Store, String> {
    Page<Store> findAllByBrandId(String brandId, Pageable pageable);
}
