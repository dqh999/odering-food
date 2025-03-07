package com.merchant.mapper;

import com.merchant.dataTransferObject.OrderStoreTableDTO;
import com.merchant.dataTransferObject.request.TableRequest;
import com.merchant.dataTransferObject.response.TableResponse;
import com.merchant.model.StoreTable;
import com.merchant.config.GlobalMapperConfig;
import org.mapstruct.*;

@Mapper(config = GlobalMapperConfig.class)
public interface TableMapper {
    StoreTable toEntity(TableRequest request);

    TableResponse toResponse(StoreTable entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget StoreTable entity, TableRequest update);

    TableResponse toResponseWithDTO(OrderStoreTableDTO tableDTO);

}
