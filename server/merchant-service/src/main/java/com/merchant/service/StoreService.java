package com.merchant.service;

import com.merchant.util.PageResponse;
import com.merchant.dataTransferObject.request.StoreRequest;
import com.merchant.dataTransferObject.response.StoreResponse;
import com.merchant.mapper.StoreMapper;
import com.merchant.model.Store;
import com.merchant.repository.StoreRepository;
import com.merchant.exception.AppException;
import com.merchant.exception.ResourceException;
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

    public PageResponse<StoreResponse> findAllByBrand(String brandId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<Store> stores = storeRepository.findAllByBrandId(brandId, pageable);
        var response = stores.map(storeMapper::toResponse);
        return PageResponse.build(response);
    }

    public boolean isTableAvailable(String storeId, String tableId) {
        return storeRepository.existsByStoreIdAndTableIdAndAvailable(storeId, tableId);
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
