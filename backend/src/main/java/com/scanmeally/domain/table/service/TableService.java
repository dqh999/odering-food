package com.scanmeally.domain.table.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.table.dataTransferObject.TableDTO;
import com.scanmeally.domain.table.model.Table;
import com.scanmeally.domain.table.repository.TableRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TableService {

    private final TableRepository tableRepository;

    public TableService(final TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<TableDTO> findAll() {
        final List<Table> tables = tableRepository.findAll(Sort.by("id"));
        return tables.stream()
                .map(table -> mapToDTO(table, new TableDTO()))
                .toList();
    }

    public TableDTO get(final String id) {
        return tableRepository.findById(id)
                .map(table -> mapToDTO(table, new TableDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final TableDTO tableDTO) {
        final Table table = new Table();
        mapToEntity(tableDTO, table);
        return tableRepository.save(table).getId();
    }

    public void update(final String id, final TableDTO tableDTO) {
        final Table table = tableRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(tableDTO, table);
        tableRepository.save(table);
    }

    public void delete(final String id) {
        tableRepository.deleteById(id);
    }

    private TableDTO mapToDTO(final Table table, final TableDTO tableDTO) {
        tableDTO.setId(table.getId());
        tableDTO.setStoreId(table.getStoreId());
        tableDTO.setTableNumber(table.getTableNumber());
        tableDTO.setStatus(table.getStatus());
        return tableDTO;
    }

    private Table mapToEntity(final TableDTO tableDTO, final Table table) {
        table.setStoreId(tableDTO.getStoreId());
        table.setTableNumber(tableDTO.getTableNumber());
        table.setStatus(tableDTO.getStatus());
        return table;
    }

}
