package com.scanmeally.domain.menu.mapper;

import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.model.MenuItem;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import com.scanmeally.infrastructure.mapper.MapperEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(componentModel = "spring",
        config = GlobalMapperConfig.class)
public interface MenuMapper extends MapperEntity<MenuItem, MenuItemRequest> {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(MenuItemUpdateRequest update, @MappingTarget MenuItem entity);
    MenuItemResponse toResponse(MenuItem entity);
}
