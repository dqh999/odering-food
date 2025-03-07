package com.scanmeally.domain.menu.repository;

import com.scanmeally.domain.menu.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, String> {
    @Query("select c from Category c " +
            "join Store s " +
            "on s.id = :storeId " +
            "where c.brandId = s.brandId")
    List<Category> findAllByStoreId(String storeId);
}
