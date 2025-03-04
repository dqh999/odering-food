package com.scanmeally.domain.review.repository;

import com.scanmeally.domain.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewRepository extends JpaRepository<Review, String> {
}
