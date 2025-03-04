package com.scanmeally.api.store;

import com.scanmeally.domain.store.dataTransferObject.StoreDTO;
import com.scanmeally.domain.store.service.StoreService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/stores", produces = MediaType.APPLICATION_JSON_VALUE)
public class StoreResource {

    private final StoreService storeService;

    public StoreResource(final StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public ResponseEntity<List<StoreDTO>> getAllStores() {
        return ResponseEntity.ok(storeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getStore(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(storeService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createStore(@RequestBody  final StoreDTO storeDTO) {
        final String createdId = storeService.create(storeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStore(@PathVariable(name = "id") final String id,
            @RequestBody  final StoreDTO storeDTO) {
        storeService.update(id, storeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteStore(@PathVariable(name = "id") final String id) {
        storeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
