package com.scanmeally.domain.store.service;

import com.scanmeally.domain.store.dataTransferObject.request.TableRequest;
import com.scanmeally.domain.store.dataTransferObject.response.TableResponse;
import com.scanmeally.domain.store.mapper.TableMapper;
import com.scanmeally.domain.store.model.StoreTable;
import com.scanmeally.domain.store.repository.TableRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TableService {
    private final TableMapper tableMapper;
    private final TableRepository tableRepository;

    public Page<TableResponse> findAllByStoreId(String storeId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<StoreTable> storeTables = tableRepository.findAllByStoreId(storeId, pageable);
        return storeTables.map(tableMapper::toResponse);
    }

    public TableResponse get(final String id) {
        return tableRepository.findById(id)
                .map(tableMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public TableResponse create(final String storeId, final TableRequest request) {
        final StoreTable storeTable = tableMapper.toEntity(request);
        storeTable.setStoreId(storeId);
        StoreTable created = tableRepository.save(storeTable);
        return tableMapper.toResponse(created);
    }

    public TableResponse update(final String id, final TableRequest request) {
        final StoreTable storeTable = tableRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        tableMapper.updateEntity(storeTable, request);
        StoreTable updated = tableRepository.save(storeTable);
        return tableMapper.toResponse(updated);

    }

    public void delete(final String id) {
        tableRepository.deleteById(id);
    }


}
