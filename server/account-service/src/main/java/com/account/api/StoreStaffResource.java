package com.account.api;

import com.account.dataTransferObject.ApiResponse;
import com.account.domain.account.dataTransferObject.StoreStaffDTO;
import com.account.domain.account.service.StoreStaffService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/storeStaffs", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Store Staff API")
public class StoreStaffResource {

    private final StoreStaffService storeStaffService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StoreStaffDTO>>> getAllStoreStaffs() {
        List<StoreStaffDTO> storeStaffs = storeStaffService.findAll();
        return ApiResponse.<List<StoreStaffDTO>>build().withData(storeStaffs).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StoreStaffDTO>> getStoreStaff(@PathVariable(name = "id") final String id) {
        StoreStaffDTO storeStaff = storeStaffService.get(id);
        return ApiResponse.<StoreStaffDTO>build().withData(storeStaff).toEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createStoreStaff(@RequestBody final StoreStaffDTO storeStaffDTO) {
        String createdId = storeStaffService.create(storeStaffDTO);
        return ApiResponse.<String>build().withData(createdId).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> updateStoreStaff(@PathVariable(name = "id") final String id,
                                                                @RequestBody final StoreStaffDTO storeStaffDTO) {
        storeStaffService.update(id, storeStaffDTO);
        return ApiResponse.<String>build().withData(id).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStoreStaff(@PathVariable(name = "id") final String id) {
        storeStaffService.delete(id);
        return ApiResponse.<Void>build().withData(null).toEntity();
    }
}
