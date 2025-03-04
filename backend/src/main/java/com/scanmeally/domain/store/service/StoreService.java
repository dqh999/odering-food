package com.scanmeally.domain.store.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.store.dataTransferObject.StoreDTO;
import com.scanmeally.domain.store.model.Store;
import com.scanmeally.domain.store.repository.StoreRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StoreService {

    private final StoreRepository storeRepository;

    public StoreService(final StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<StoreDTO> findAll() {
        final List<Store> stores = storeRepository.findAll(Sort.by("id"));
        return stores.stream()
                .map(store -> mapToDTO(store, new StoreDTO()))
                .toList();
    }

    public StoreDTO get(final String id) {
        return storeRepository.findById(id)
                .map(store -> mapToDTO(store, new StoreDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final StoreDTO storeDTO) {
        final Store store = new Store();
        mapToEntity(storeDTO, store);
        return storeRepository.save(store).getId();
    }

    public void update(final String id, final StoreDTO storeDTO) {
        final Store store = storeRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(storeDTO, store);
        storeRepository.save(store);
    }

    public void delete(final String id) {
        storeRepository.deleteById(id);
    }

    private StoreDTO mapToDTO(final Store store, final StoreDTO storeDTO) {
        storeDTO.setId(store.getId());
        storeDTO.setBrandId(store.getBrandId());
        storeDTO.setName(store.getName());
        storeDTO.setAddress(store.getAddress());
        storeDTO.setPhone(store.getPhone());
        storeDTO.setCreatedAt(store.getCreatedAt());
        storeDTO.setUpdatedAt(store.getUpdatedAt());
        return storeDTO;
    }

    private Store mapToEntity(final StoreDTO storeDTO, final Store store) {
        store.setBrandId(storeDTO.getBrandId());
        store.setName(storeDTO.getName());
        store.setAddress(storeDTO.getAddress());
        store.setPhone(storeDTO.getPhone());
        store.setCreatedAt(storeDTO.getCreatedAt());
        store.setUpdatedAt(storeDTO.getUpdatedAt());
        return store;
    }

}
