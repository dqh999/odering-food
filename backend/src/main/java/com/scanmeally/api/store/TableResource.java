package com.scanmeally.api.store;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.store.dataTransferObject.request.TableRequest;
import com.scanmeally.domain.store.dataTransferObject.response.TableResponse;
import com.scanmeally.domain.store.service.StoreTableService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/api/table", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Table API", description = "Manage restaurant tables")
public class TableResource {

    private final StoreTableService tableService;

    public TableResource(final StoreTableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    @Operation(summary = "Get all tables", description = "Retrieve all tables for a specific store with pagination")
    public ResponseEntity<ApiResponse<PageResponse<TableResponse>>> getAllTables(
            @Parameter(description = "Store ID to fetch tables") @RequestParam String storeId,
            @Parameter(description = "Page number, default is 1") @RequestParam(name = "page", defaultValue = "1") int page,
            @Parameter(description = "Page size, default is 10") @RequestParam(name = "pageSize", defaultValue = "10") int pageSize
    ) {
        final var response = tableService.findAllByStoreId(storeId, page, pageSize);
        return ApiResponse.<PageResponse<TableResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get table details", description = "Retrieve details of a specific table")
    public ResponseEntity<ApiResponse<TableResponse>> getTable(
            @Parameter(description = "Table ID") @PathVariable(name = "id") final String id
    ) {
        final var response = tableService.get(id);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @PostMapping("/{storeId}")
    @Operation(summary = "Create a table", description = "Create a new table for a store")
    public ResponseEntity<ApiResponse<TableResponse>> createTable(
            @Parameter(description = "Store ID") @PathVariable String storeId,
            @RequestBody final TableRequest request
    ) {
        final var response = tableService.create(storeId, request);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update table details", description = "Update an existing table")
    public ResponseEntity<ApiResponse<TableResponse>> updateTable(
            @Parameter(description = "Table ID") @PathVariable(name = "id") final String id,
            @RequestBody final TableRequest request
    ) {
        final var response = tableService.update(id, request);
        return ApiResponse.<TableResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a table", description = "Remove a table from the system")
    public ResponseEntity<Void> deleteTable(
            @Parameter(description = "Table ID") @PathVariable(name = "id") final String id
    ) {
        tableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
