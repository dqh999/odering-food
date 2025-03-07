package com.scanmeally.domain.order.mapper;

import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", config = GlobalMapperConfig.class)
public interface OrderMapper {

    OrderResponse toResponse(Order order);
}