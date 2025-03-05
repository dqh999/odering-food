package com.scanmeally.domain.order.mapper;


import com.scanmeally.domain.order.dataTransferObject.response.OrderItemResponse;
import com.scanmeally.domain.order.model.OrderItem;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.*;

@Mapper(componentModel = "spring", config = GlobalMapperConfig.class)
public interface OrderItemMapper {
    OrderItemResponse toResponse(OrderItem orderItem);
}
