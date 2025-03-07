package com.merchant.repository;

import com.merchant.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BrandRepository extends JpaRepository<Brand, String> {
}
