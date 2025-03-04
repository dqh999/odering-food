package com.scanmeally.domain.menu.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.menu.dataTransferObject.MenuItemDTO;
import com.scanmeally.domain.menu.model.MenuItem;
import com.scanmeally.domain.menu.repository.MenuItemRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(final MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItemDTO> findAll() {
        final List<MenuItem> menuItems = menuItemRepository.findAll(Sort.by("id"));
        return menuItems.stream()
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .toList();
    }

    public MenuItemDTO get(final String id) {
        return menuItemRepository.findById(id)
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = new MenuItem();
        mapToEntity(menuItemDTO, menuItem);
        return menuItemRepository.save(menuItem).getId();
    }

    public void update(final String id, final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(menuItemDTO, menuItem);
        menuItemRepository.save(menuItem);
    }

    public void delete(final String id) {
        menuItemRepository.deleteById(id);
    }

    private MenuItemDTO mapToDTO(final MenuItem menuItem, final MenuItemDTO menuItemDTO) {
        menuItemDTO.setId(menuItem.getId());
        menuItemDTO.setStoreId(menuItem.getStoreId());
        menuItemDTO.setCategoryId(menuItem.getCategoryId());
        menuItemDTO.setName(menuItem.getName());
        menuItemDTO.setDescription(menuItem.getDescription());
        menuItemDTO.setPrice(menuItem.getPrice());
        menuItemDTO.setImageUrl(menuItem.getImageUrl());
        menuItemDTO.setAvailable(menuItem.getAvailable());
        menuItemDTO.setCreatedAt(menuItem.getCreatedAt());
        menuItemDTO.setUpdatedAt(menuItem.getUpdatedAt());
        return menuItemDTO;
    }

    private MenuItem mapToEntity(final MenuItemDTO menuItemDTO, final MenuItem menuItem) {
        menuItem.setStoreId(menuItemDTO.getStoreId());
        menuItem.setCategoryId(menuItemDTO.getCategoryId());
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItem.setImageUrl(menuItemDTO.getImageUrl());
        menuItem.setAvailable(menuItemDTO.getAvailable());
        menuItem.setCreatedAt(menuItemDTO.getCreatedAt());
        menuItem.setUpdatedAt(menuItemDTO.getUpdatedAt());
        return menuItem;
    }

}
