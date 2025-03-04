package com.scanmeally.domain.table.repository;

import com.scanmeally.domain.table.model.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QrCodeRepository extends JpaRepository<QrCode, String> {
}
