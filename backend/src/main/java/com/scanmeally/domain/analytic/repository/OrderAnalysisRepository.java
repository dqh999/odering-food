package com.scanmeally.domain.analytic.repository;

import com.scanmeally.domain.analytic.model.OrderAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface OrderAnalysisRepository extends MongoRepository<OrderAnalysis, String> {
    Optional<OrderAnalysis> findByStoreIdAndAnalysisDate(String storeId, LocalDate analysisDate);
}