package com.scanmeally.domain.store.service;

import com.scanmeally.domain.store.dataTransferObject.request.StoreRequest;
import com.scanmeally.domain.store.dataTransferObject.response.StoreResponse;
import com.scanmeally.domain.store.mapper.StoreMapper;
import com.scanmeally.domain.store.model.Store;
import com.scanmeally.domain.store.repository.StoreRepository;
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
public class StoreService {
    private final StoreMapper storeMapper;
    private final StoreRepository storeRepository;

    public Page<StoreResponse> findAllByBrand(String brandId,int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<Store> stores = storeRepository.findAllByBrandId(brandId,pageable);
        return stores.map(storeMapper::toResponse);
    }

    public StoreResponse get(final String id) {
        return storeRepository.findById(id)
                .map(storeMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public StoreResponse create(final String brandId, final StoreRequest request) {
        final Store store = storeMapper.toEntity(request);
        store.setBrandId(brandId);
        Store created = storeRepository.save(store);
        return storeMapper.toResponse(created);
    }

    public StoreResponse update(final String id, final StoreRequest request) {
        final Store store = storeRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        storeMapper.update(request, store);
        Store updated = storeRepository.save(store);
        return storeMapper.toResponse(updated);
    }

    public void delete(final String id) {
        storeRepository.deleteById(id);
    }


}
