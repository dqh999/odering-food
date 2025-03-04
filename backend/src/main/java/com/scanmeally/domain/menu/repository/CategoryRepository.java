package com.scanmeally.domain.menu.repository;

import com.scanmeally.domain.menu.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, String> {
}
