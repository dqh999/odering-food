package com.account.repository;

import com.account.model.StoreStaff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreStaffRepository extends JpaRepository<StoreStaff, String> {
}
