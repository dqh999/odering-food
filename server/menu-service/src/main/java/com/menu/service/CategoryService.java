package com.menu.service;

import com.menu.util.PageResponse;
import com.menu.dataTransferObject.request.CategoryRequest;
import com.menu.dataTransferObject.request.CategoryUpdateRequest;
import com.menu.dataTransferObject.response.CategoryResponse;
import com.menu.mapper.CategoryMapper;
import com.menu.repository.CategoryRepository;
import com.menu.model.Category;
import com.menu.exception.AppException;
import com.menu.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> findAllByStoreId(final String storeId) {
        return categoryRepository.findAllByStoreId(storeId)
                .stream().map(categoryMapper::toResponse).collect(Collectors.toList());
    }

    public PageResponse<CategoryResponse> findAll(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "id");
        final Page<Category> categories = categoryRepository.findAll(pageable);
        var response = categories.map(categoryMapper::toResponse);
        return PageResponse.build(response);
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
