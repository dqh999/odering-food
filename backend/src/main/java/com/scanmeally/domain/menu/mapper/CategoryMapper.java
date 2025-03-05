package com.scanmeally.domain.menu.mapper;

import com.scanmeally.domain.menu.dataTransferObject.request.CategoryRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.CategoryUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.CategoryResponse;
import com.scanmeally.domain.menu.model.Category;
import com.scanmeally.infrastructure.config.GlobalMapperConfig;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        config = GlobalMapperConfig.class)
public interface CategoryMapper {
    Category create(CategoryRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(CategoryUpdateRequest update, @MappingTarget Category entity);
    CategoryResponse toResponse(Category category);
}
