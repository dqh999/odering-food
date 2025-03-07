package com.menu.mapper;

import com.menu.dataTransferObject.request.MenuItemRequest;
import com.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.menu.dataTransferObject.response.MenuItemResponse;
import com.menu.model.MenuItem;
import com.menu.config.GlobalMapperConfig;
import org.mapstruct.*;


@Mapper(config = GlobalMapperConfig.class)
public interface MenuMapper {
    MenuItem toEntity(MenuItemRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(MenuItemUpdateRequest update, @MappingTarget MenuItem entity);
    MenuItemResponse toResponse(MenuItem entity);
}
