package com.scanmeally.api.store;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.store.dataTransferObject.request.BrandRequest;
import com.scanmeally.domain.store.dataTransferObject.request.BrandUpdateRequest;
import com.scanmeally.domain.store.dataTransferObject.response.BrandResponse;
import com.scanmeally.domain.store.service.BrandService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/brand", produces = MediaType.APPLICATION_JSON_VALUE)
public class BrandResource {

    private final BrandService brandService;

    public BrandResource(final BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<BrandResponse>>> getAllBrands(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = brandService.findAll(page, pageSize);
        return ApiResponse.<PageResponse<BrandResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandResponse>> getBrand(@PathVariable(name = "id") final String id) {
        final var response = brandService.get(id);
        return ApiResponse.<BrandResponse>build().withData(response).toEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BrandResponse>> createBrand(@RequestBody final BrandRequest request) {
        final var response = brandService.create(request);
        return ApiResponse.<BrandResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandResponse>> updateBrand(
            @PathVariable(name = "id") final String id,
            @RequestBody final BrandUpdateRequest request
    ) {
        final var response = brandService.update(id, request);
        return ApiResponse.<BrandResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable(name = "id") final String id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
