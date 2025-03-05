package com.scanmeally.api.store;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.store.dataTransferObject.request.TableRequest;
import com.scanmeally.domain.store.dataTransferObject.response.TableResponse;
import com.scanmeally.domain.store.service.TableService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping(value = "/api/table", produces = MediaType.APPLICATION_JSON_VALUE)
public class TableResource {

    private final TableService tableService;

    public TableResource(final TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<TableResponse>>> getAllTables(
            @RequestParam String storeId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        final var response = tableService.findAllByStoreId(storeId, page, pageSize);
        return ApiResponse.<PageResponse<TableResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TableResponse>> getTable(@PathVariable(name = "id") final String id) {
        final var response = tableService.get(id);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @PostMapping("/{storeId}")
    public ResponseEntity<ApiResponse<TableResponse>> createTable(
            @PathVariable String storeId,
            @RequestBody final TableRequest request
    ) {
        final var response = tableService.create(storeId, request);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TableResponse>> updateTable(
            @PathVariable(name = "id") final String id,
            @RequestBody final TableRequest request
    ) {
        final var response = tableService.update(id, request);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable(name = "id") final String id) {
        tableService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
