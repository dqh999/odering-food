package com.menu.mapper;

import com.menu.dataTransferObject.request.CategoryRequest;
import com.menu.dataTransferObject.request.CategoryUpdateRequest;
import com.menu.dataTransferObject.response.CategoryResponse;
import com.menu.model.Category;
import com.menu.config.GlobalMapperConfig;
import org.mapstruct.*;

@Mapper(config = GlobalMapperConfig.class)
public interface CategoryMapper {
    Category create(CategoryRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(CategoryUpdateRequest update, @MappingTarget Category entity);

    CategoryResponse toResponse(Category category);

}
