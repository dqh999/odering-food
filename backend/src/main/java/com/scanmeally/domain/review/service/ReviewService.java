package com.scanmeally.domain.review.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.review.dataTransferObject.ReviewDTO;
import com.scanmeally.domain.review.model.Review;
import com.scanmeally.domain.review.repository.ReviewRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(final ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewDTO> findAll() {
        final List<Review> reviews = reviewRepository.findAll(Sort.by("id"));
        return reviews.stream()
                .map(review -> mapToDTO(review, new ReviewDTO()))
                .toList();
    }

    public ReviewDTO get(final String id) {
        return reviewRepository.findById(id)
                .map(review -> mapToDTO(review, new ReviewDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final ReviewDTO reviewDTO) {
        final Review review = new Review();
        mapToEntity(reviewDTO, review);
        return reviewRepository.save(review).getId();
    }

    public void update(final String id, final ReviewDTO reviewDTO) {
        final Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(reviewDTO, review);
        reviewRepository.save(review);
    }

    public void delete(final String id) {
        reviewRepository.deleteById(id);
    }

    private ReviewDTO mapToDTO(final Review review, final ReviewDTO reviewDTO) {
        reviewDTO.setId(review.getId());
        reviewDTO.setUserId(review.getUserId());
        reviewDTO.setStoreId(review.getStoreId());
        reviewDTO.setRating(review.getRating());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setCreatedAt(review.getCreatedAt());
        reviewDTO.setUpdatedAt(review.getUpdatedAt());
        return reviewDTO;
    }

    private Review mapToEntity(final ReviewDTO reviewDTO, final Review review) {
        review.setUserId(reviewDTO.getUserId());
        review.setStoreId(reviewDTO.getStoreId());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setCreatedAt(reviewDTO.getCreatedAt());
        review.setUpdatedAt(reviewDTO.getUpdatedAt());
        return review;
    }

}
