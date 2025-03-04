package com.scanmeally.api.account;

import com.scanmeally.domain.account.dataTransferObject.StoreStaffDTO;
import com.scanmeally.domain.account.service.StoreStaffService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/storeStaffs", produces = MediaType.APPLICATION_JSON_VALUE)
public class StoreStaffResource {

    private final StoreStaffService storeStaffService;

    public StoreStaffResource(final StoreStaffService storeStaffService) {
        this.storeStaffService = storeStaffService;
    }

    @GetMapping
    public ResponseEntity<List<StoreStaffDTO>> getAllStoreStaffs() {
        return ResponseEntity.ok(storeStaffService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreStaffDTO> getStoreStaff(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(storeStaffService.get(id));
    }

    @PostMapping
    public ResponseEntity<String> createStoreStaff(
            @RequestBody  final StoreStaffDTO storeStaffDTO) {
        final String createdId = storeStaffService.create(storeStaffDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStoreStaff(@PathVariable(name = "id") final String id,
            @RequestBody  final StoreStaffDTO storeStaffDTO) {
        storeStaffService.update(id, storeStaffDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteStoreStaff(@PathVariable(name = "id") final String id) {
        storeStaffService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
