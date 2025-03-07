package com.merchant.api;

import com.merchant.util.PageResponse;
import com.merchant.dataTransferObject.ApiResponse;
import com.merchant.dataTransferObject.request.BrandRequest;
import com.merchant.dataTransferObject.request.BrandUpdateRequest;
import com.merchant.dataTransferObject.response.BrandResponse;
import com.merchant.service.BrandService;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/brand", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Brand API")
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
