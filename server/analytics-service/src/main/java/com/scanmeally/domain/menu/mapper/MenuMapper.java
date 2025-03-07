package com.scanmeally.domain.menu.mapper;

import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.model.MenuItem;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.*;


@Mapper(config = GlobalMapperConfig.class)
public interface MenuMapper {
    MenuItem toEntity(MenuItemRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(MenuItemUpdateRequest update, @MappingTarget MenuItem entity);
    MenuItemResponse toResponse(MenuItem entity);
}
