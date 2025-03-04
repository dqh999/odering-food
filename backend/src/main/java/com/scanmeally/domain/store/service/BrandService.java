package com.scanmeally.domain.store.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.store.dataTransferObject.BrandDTO;
import com.scanmeally.domain.store.model.Brand;
import com.scanmeally.domain.store.repository.BrandRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(final BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<BrandDTO> findAll() {
        final List<Brand> brands = brandRepository.findAll(Sort.by("id"));
        return brands.stream()
                .map(brand -> mapToDTO(brand, new BrandDTO()))
                .toList();
    }

    public BrandDTO get(final String id) {
        return brandRepository.findById(id)
                .map(brand -> mapToDTO(brand, new BrandDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final BrandDTO brandDTO) {
        final Brand brand = new Brand();
        mapToEntity(brandDTO, brand);
        return brandRepository.save(brand).getId();
    }

    public void update(final String id, final BrandDTO brandDTO) {
        final Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(brandDTO, brand);
        brandRepository.save(brand);
    }

    public void delete(final String id) {
        brandRepository.deleteById(id);
    }

    private BrandDTO mapToDTO(final Brand brand, final BrandDTO brandDTO) {
        brandDTO.setId(brand.getId());
        brandDTO.setName(brand.getName());
        brandDTO.setOwnerId(brand.getOwnerId());
        brandDTO.setCreatedAt(brand.getCreatedAt());
        brandDTO.setUpdatedAt(brand.getUpdatedAt());
        return brandDTO;
    }

    private Brand mapToEntity(final BrandDTO brandDTO, final Brand brand) {
        brand.setName(brandDTO.getName());
        brand.setOwnerId(brandDTO.getOwnerId());
        brand.setCreatedAt(brandDTO.getCreatedAt());
        brand.setUpdatedAt(brandDTO.getUpdatedAt());
        return brand;
    }

}
