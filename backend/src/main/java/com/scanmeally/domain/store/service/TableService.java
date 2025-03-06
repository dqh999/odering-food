package com.scanmeally.domain.store.service;

import com.scanmeally.domain.store.dataTransferObject.StoreTableDTO;
import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.domain.store.dataTransferObject.request.TableRequest;
import com.scanmeally.domain.store.dataTransferObject.response.TableResponse;
import com.scanmeally.domain.store.exception.StoreException;
import com.scanmeally.domain.store.mapper.TableMapper;
import com.scanmeally.domain.store.model.StoreTable;
import com.scanmeally.domain.store.repository.StoreTableRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TableService {
    private final TableMapper tableMapper;
    private final StoreTableRepository storeTableRepository;

    public PageResponse<TableResponse> findAllByStoreId(String storeId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<StoreTableDTO> storeTables = storeTableRepository.findAllByStoreId(storeId, pageable);
        var response = storeTables.map(dto -> {
            TableResponse tableResponse = tableMapper.toResponseWithDTO(dto);
            tableResponse.setStatus(resolveStatus(dto));
            return tableResponse;
        });
        return PageResponse.build(response);
    }

    public TableResponse get(final String id) {
        return storeTableRepository.findById(id)
                .map(tableMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String getStoreIdByTableId(final String tableId) {
        Optional<Object[]> result = storeTableRepository.findStoreIdByTableId(tableId);
        if (result.isEmpty()) {
            throw new AppException(ResourceException.ENTITY_NOT_FOUND);
        }
        Object[] data = result.get();
        Object[] row = (Object[]) data[0];
        String storeId = (String) row[0];
        Boolean available = (Boolean) row[1];
        if (available) return storeId;
        throw new AppException(StoreException.TABLE_NOT_AVAILABLE);
    }

    public TableResponse create(final String storeId, final TableRequest request) {
        final StoreTable storeTable = tableMapper.toEntity(request);
        storeTable.setStoreId(storeId);
        StoreTable created = storeTableRepository.save(storeTable);
        return tableMapper.toResponse(created);
    }

    public TableResponse update(final String id, final TableRequest request) {
        final StoreTable storeTable = storeTableRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        tableMapper.updateEntity(storeTable, request);
        StoreTable updated = storeTableRepository.save(storeTable);
        return tableMapper.toResponse(updated);

    }

    public void delete(final String id) {
        storeTableRepository.deleteById(id);
    }

    private String resolveStatus(StoreTableDTO tableDTO) {
        if (tableDTO.getOrderStatus() != null) {
            return tableDTO.getOrderStatus().name();
        }
        return Boolean.TRUE.equals(tableDTO.getAvailable()) ? "AVAILABLE" : "OCCUPIED";
    }
}
