package com.scanmeally.domain.store.mapper;

import com.scanmeally.domain.store.dataTransferObject.request.StoreRequest;
import com.scanmeally.domain.store.dataTransferObject.response.StoreResponse;
import com.scanmeally.domain.store.model.Store;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(config = GlobalMapperConfig.class)
public interface StoreMapper {
    Store toEntity(StoreRequest request);
    StoreResponse toResponse(Store store);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(StoreRequest update, @MappingTarget Store entity);
}