package com.scanmeally.domain.account.repository;

import com.scanmeally.domain.account.model.StoreStaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StoreStaffRepository extends JpaRepository<StoreStaff, String> {
    List<String> findAllByUserIdAndStoreId(String userId, String storeId);
}
