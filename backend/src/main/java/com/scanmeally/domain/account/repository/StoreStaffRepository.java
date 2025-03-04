package com.scanmeally.domain.account.repository;

import com.scanmeally.domain.account.model.StoreStaff;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StoreStaffRepository extends JpaRepository<StoreStaff, String> {
}
