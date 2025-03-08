package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BrandRepository extends JpaRepository<Brand, String> {
}
