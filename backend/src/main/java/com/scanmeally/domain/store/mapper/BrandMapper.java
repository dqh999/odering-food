package com.scanmeally.domain.store.mapper;

import com.scanmeally.domain.store.dataTransferObject.request.BrandRequest;
import com.scanmeally.domain.store.dataTransferObject.request.BrandUpdateRequest;
import com.scanmeally.domain.store.dataTransferObject.response.BrandResponse;
import com.scanmeally.domain.store.model.Brand;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(config = GlobalMapperConfig.class)
public interface BrandMapper {
    Brand toEntity(BrandRequest request);
    BrandResponse toResponse(Brand brand);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(BrandUpdateRequest update, @MappingTarget Brand entity);
}