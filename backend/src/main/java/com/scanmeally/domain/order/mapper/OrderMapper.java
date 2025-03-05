package com.scanmeally.domain.order.mapper;

import com.scanmeally.domain.order.dataTransferObject.request.OrderRequest;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import com.scanmeally.domain.order.model.Order;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", config = GlobalMapperConfig.class, uses = OrderItemMapper.class)
public interface OrderMapper {
    Order toEntity(OrderRequest request);

    OrderResponse toResponse(Order order);
}