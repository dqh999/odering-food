package com.scanmeally.api.table;

import com.scanmeally.domain.table.dataTransferObject.TableDTO;
import com.scanmeally.domain.table.service.TableService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/Tables", produces = MediaType.APPLICATION_JSON_VALUE)
public class TableResource {

    private final TableService tableService;

    public TableResource(final TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    public ResponseEntity<List<TableDTO>> getAllTables() {
        return ResponseEntity.ok(tableService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TableDTO> getTable(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(tableService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createTable(@RequestBody  final TableDTO tableDTO) {
        final String createdId = tableService.create(tableDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTable(@PathVariable(name = "id") final String id,
            @RequestBody  final TableDTO tableDTO) {
        tableService.update(id, tableDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteTable(@PathVariable(name = "id") final String id) {
        tableService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
