package com.scanmeally.api.review;

import com.scanmeally.domain.review.service.ReviewService;
import com.scanmeally.domain.review.dataTransferObject.ReviewDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/reviews", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReviewResource {

    private final ReviewService reviewService;

    public ReviewResource(final ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReview(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(reviewService.get(id));
    }

    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody  final ReviewDTO reviewDTO) {
        final String createdId = reviewService.create(reviewDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateReview(@PathVariable(name = "id") final String id,
            @RequestBody  final ReviewDTO reviewDTO) {
        reviewService.update(id, reviewDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable(name = "id") final String id) {
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
