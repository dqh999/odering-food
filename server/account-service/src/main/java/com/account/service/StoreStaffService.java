package com.account.service;

import com.account.dataTransferObject.StoreStaffDTO;
import com.account.model.StoreStaff;
import com.account.repository.StoreStaffRepository;
import com.account.exception.AppException;
import com.account.exception.ResourceException;
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
        return storeStaffDTO;
    }

    private StoreStaff mapToEntity(final StoreStaffDTO storeStaffDTO, final StoreStaff storeStaff) {
        storeStaff.setStoreId(storeStaffDTO.getStoreId());
        storeStaff.setUserId(storeStaffDTO.getUserId());
        storeStaff.setRole(storeStaffDTO.getRole());
        return storeStaff;
    }

}
