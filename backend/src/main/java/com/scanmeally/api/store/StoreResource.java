package com.scanmeally.api.store;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.store.dataTransferObject.request.StoreRequest;
import com.scanmeally.domain.store.dataTransferObject.response.StoreResponse;
import com.scanmeally.domain.store.service.StoreService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/store", produces = MediaType.APPLICATION_JSON_VALUE)
public class StoreResource {

    private final StoreService storeService;

    public StoreResource(final StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<StoreResponse>>> getAllStores(
            @RequestParam String brandId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = storeService.findAllByBrand(brandId,page, pageSize);
        return ApiResponse.<PageResponse<StoreResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StoreResponse>> getStore(@PathVariable(name = "id") final String id) {
        final var response = storeService.get(id);
        return ApiResponse.<StoreResponse>build().withData(response).toEntity();
    }

    @PostMapping("/{brandId}")
    public ResponseEntity<ApiResponse<StoreResponse>> createStore(
            @PathVariable(name = "brandId") final String brandId,
            @RequestBody  final StoreRequest request
    ) {
        final var response = storeService.create(brandId,request);
        return ApiResponse.<StoreResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StoreResponse>> updateStore(
            @PathVariable(name = "id") final String id,
            @RequestBody  final StoreRequest request
    ) {
        final var response = storeService.update(id,request);
        return ApiResponse.<StoreResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable(name = "id") final String id) {
        storeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
