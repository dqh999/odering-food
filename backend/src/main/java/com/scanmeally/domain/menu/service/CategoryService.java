package com.scanmeally.domain.menu.service;

import com.scanmeally.domain.menu.dataTransferObject.request.CategoryRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.CategoryUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.CategoryResponse;
import com.scanmeally.domain.menu.mapper.CategoryMapper;
import com.scanmeally.domain.menu.repository.CategoryRepository;
import com.scanmeally.domain.menu.model.Category;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;


    public Page<CategoryResponse> findAll(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<Category> categories = categoryRepository.findAll(pageable);
        return categories.map(categoryMapper::toResponse);
    }

    public CategoryResponse get(final String id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public CategoryResponse create(final CategoryRequest request) {
        final Category category = categoryMapper.create(request);
        final Category savedEntity = categoryRepository.save(category);
        return categoryMapper.toResponse(savedEntity);
    }

    public CategoryResponse update(final String id, final CategoryUpdateRequest request) {
        final Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        categoryMapper.update(request, category);
        final Category savedEntity = categoryRepository.save(category);
        return categoryMapper.toResponse(savedEntity);
    }

    public void delete(final String id) {
        categoryRepository.deleteById(id);
    }

}
