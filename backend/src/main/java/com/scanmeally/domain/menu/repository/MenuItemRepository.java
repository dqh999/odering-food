package com.scanmeally.domain.menu.repository;

import com.scanmeally.domain.menu.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
}
