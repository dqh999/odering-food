package com.scanmeally.domain.table.repository;

import com.scanmeally.domain.table.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TableRepository extends JpaRepository<Table, String> {
}
