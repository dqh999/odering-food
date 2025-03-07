package com.merchant.mapper;

import com.merchant.dataTransferObject.request.BrandRequest;
import com.merchant.dataTransferObject.request.BrandUpdateRequest;
import com.merchant.dataTransferObject.response.BrandResponse;
import com.merchant.model.Brand;
import com.merchant.config.GlobalMapperConfig;
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