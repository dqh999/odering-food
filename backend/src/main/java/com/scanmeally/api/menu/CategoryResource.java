package com.scanmeally.api.menu;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.menu.dataTransferObject.request.CategoryRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.CategoryUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.CategoryResponse;
import com.scanmeally.domain.menu.service.CategoryService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/category", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryResource {

    private final CategoryService categoryService;

    public CategoryResource(final CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getAllCategories(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = categoryService.findAll(page, pageSize);
        return ApiResponse.<PageResponse<CategoryResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategory(@PathVariable(name = "id") final String id) {
        final var response = categoryService.get(id);
        return ApiResponse.<CategoryResponse>build().withData(response).toEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody final CategoryRequest request) {
        final var response = categoryService.create(request);
        return ApiResponse.<CategoryResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable(name = "id") final String id,
            @RequestBody final CategoryUpdateRequest request
    ) {
        final var response = categoryService.update(id, request);
        return ApiResponse.<CategoryResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable(name = "id") final String id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
