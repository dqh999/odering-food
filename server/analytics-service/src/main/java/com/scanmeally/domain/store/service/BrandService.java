package com.scanmeally.domain.store.service;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.domain.store.dataTransferObject.request.BrandRequest;
import com.scanmeally.domain.store.dataTransferObject.request.BrandUpdateRequest;
import com.scanmeally.domain.store.dataTransferObject.response.BrandResponse;
import com.scanmeally.domain.store.mapper.BrandMapper;
import com.scanmeally.domain.store.model.Brand;
import com.scanmeally.domain.store.repository.BrandRepository;
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
public class BrandService {
    private final BrandMapper brandMapper;
    private final BrandRepository brandRepository;

    public PageResponse<BrandResponse> findAll(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page-1, pageSize, Sort.Direction.DESC, "id");
        final Page<Brand> brands = brandRepository.findAll(pageable);
        var response = brands.map(brandMapper::toResponse);
        return PageResponse.build(response);
    }

    public BrandResponse get(final String id) {
        return brandRepository.findById(id)
                .map(brandMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public BrandResponse create(final BrandRequest request) {
        final Brand brand = brandMapper.toEntity(request);
        Brand created = brandRepository.save(brand);
        return brandMapper.toResponse(created);
    }

    public BrandResponse update(final String id, final BrandUpdateRequest request) {
        final Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        brandMapper.update(request, brand);
        Brand updated = brandRepository.save(brand);
        return brandMapper.toResponse(updated);
    }

    public void delete(final String id) {
        brandRepository.deleteById(id);
    }


}
