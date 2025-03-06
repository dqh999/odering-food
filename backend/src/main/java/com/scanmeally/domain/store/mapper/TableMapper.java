package com.scanmeally.domain.store.mapper;

import com.scanmeally.domain.store.dataTransferObject.StoreTableDTO;
import com.scanmeally.domain.store.dataTransferObject.request.TableRequest;
import com.scanmeally.domain.store.dataTransferObject.response.TableResponse;
import com.scanmeally.domain.store.model.StoreTable;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.*;

@Mapper(componentModel = "spring",
        config = GlobalMapperConfig.class)
public interface TableMapper {
    StoreTable toEntity(TableRequest request);

    TableResponse toResponse(StoreTable entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget StoreTable entity, TableRequest update);

    TableResponse toResponseWithDTO(StoreTableDTO tableDTO);

}
