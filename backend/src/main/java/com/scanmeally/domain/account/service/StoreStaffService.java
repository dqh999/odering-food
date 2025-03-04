package com.scanmeally.domain.account.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.account.dataTransferObject.StoreStaffDTO;
import com.scanmeally.domain.account.model.StoreStaff;
import com.scanmeally.domain.account.repository.StoreStaffRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StoreStaffService {

    private final StoreStaffRepository storeStaffRepository;

    public StoreStaffService(final StoreStaffRepository storeStaffRepository) {
        this.storeStaffRepository = storeStaffRepository;
    }

    public List<StoreStaffDTO> findAll() {
        final List<StoreStaff> storeStaffs = storeStaffRepository.findAll(Sort.by("id"));
        return storeStaffs.stream()
                .map(storeStaff -> mapToDTO(storeStaff, new StoreStaffDTO()))
                .toList();
    }

    public StoreStaffDTO get(final String id) {
        return storeStaffRepository.findById(id)
                .map(storeStaff -> mapToDTO(storeStaff, new StoreStaffDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final StoreStaffDTO storeStaffDTO) {
        final StoreStaff storeStaff = new StoreStaff();
        mapToEntity(storeStaffDTO, storeStaff);
        return storeStaffRepository.save(storeStaff).getId();
    }

    public void update(final String id, final StoreStaffDTO storeStaffDTO) {
        final StoreStaff storeStaff = storeStaffRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(storeStaffDTO, storeStaff);
        storeStaffRepository.save(storeStaff);
    }

    public void delete(final String id) {
        storeStaffRepository.deleteById(id);
    }

    private StoreStaffDTO mapToDTO(final StoreStaff storeStaff, final StoreStaffDTO storeStaffDTO) {
        storeStaffDTO.setId(storeStaff.getId());
        storeStaffDTO.setStoreId(storeStaff.getStoreId());
        storeStaffDTO.setUserId(storeStaff.getUserId());
        storeStaffDTO.setRole(storeStaff.getRole());
        storeStaffDTO.setCreatedAt(storeStaff.getCreatedAt());
        storeStaffDTO.setUpdatedAt(storeStaff.getUpdatedAt());
        return storeStaffDTO;
    }

    private StoreStaff mapToEntity(final StoreStaffDTO storeStaffDTO, final StoreStaff storeStaff) {
        storeStaff.setStoreId(storeStaffDTO.getStoreId());
        storeStaff.setUserId(storeStaffDTO.getUserId());
        storeStaff.setRole(storeStaffDTO.getRole());
        storeStaff.setCreatedAt(storeStaffDTO.getCreatedAt());
        storeStaff.setUpdatedAt(storeStaffDTO.getUpdatedAt());
        return storeStaff;
    }

}
