package com.scanmeally.api.store;

import com.scanmeally.domain.store.service.BrandService;
import com.scanmeally.domain.store.dataTransferObject.BrandDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/brands", produces = MediaType.APPLICATION_JSON_VALUE)
public class BrandResource {

    private final BrandService brandService;

    public BrandResource(final BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        return ResponseEntity.ok(brandService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDTO> getBrand(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(brandService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createBrand(@RequestBody  final BrandDTO brandDTO) {
        final String createdId = brandService.create(brandDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBrand(@PathVariable(name = "id") final String id,
            @RequestBody  final BrandDTO brandDTO) {
        brandService.update(id, brandDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteBrand(@PathVariable(name = "id") final String id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
