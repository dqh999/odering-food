package com.scanmeally.domain.payment.repository;

import com.scanmeally.domain.payment.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment, String> {
}
