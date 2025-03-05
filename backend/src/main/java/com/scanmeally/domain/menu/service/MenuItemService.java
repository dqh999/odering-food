package com.scanmeally.domain.menu.service;

import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.mapper.MenuMapper;
import com.scanmeally.domain.menu.model.MenuItem;
import com.scanmeally.domain.menu.repository.MenuItemRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MenuItemService {
    private final MenuMapper menuMapper;
    private final MenuItemRepository menuItemRepository;


    public MenuItemResponse get(final String id) {
        return menuItemRepository.findById(id)
                .map(menuMapper::toResponse)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public MenuItemResponse create(String storeId, final MenuItemRequest request) {
        final MenuItem menuItem = menuMapper.toEntity(request);
        menuItem.setStoreId(storeId);
        var saved = menuItemRepository.save(menuItem);
        return menuMapper.toResponse(saved);
    }

    public MenuItemResponse update(final String id, final MenuItemUpdateRequest request) {
        final MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        menuMapper.update(request, menuItem);
        menuItemRepository.save(menuItem);
        return menuMapper.toResponse(menuItem);
    }

    public void delete(final String id) {
        menuItemRepository.deleteById(id);
    }

}
