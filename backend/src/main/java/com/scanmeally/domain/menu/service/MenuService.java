package com.scanmeally.domain.menu.service;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.domain.menu.dataTransferObject.MenuItemDTO;
import com.scanmeally.domain.menu.dataTransferObject.request.GetMenuRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.SearchMenuRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.CategoryResponse;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuResponse;
import com.scanmeally.domain.menu.mapper.MenuMapper;
import com.scanmeally.domain.menu.model.MenuItem;
import com.scanmeally.domain.menu.repository.MenuItemRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MenuService {
    private final CategoryService categoryService;
    private final MenuMapper menuMapper;
    private final MenuItemRepository menuItemRepository;

    public MenuResponse getMenu(String storeId, final GetMenuRequest request) {
        List<CategoryResponse> categoryResponses = categoryService.findAllByStoreId(storeId);
        String existingCategoryId = request.getCategoryId() != null ? request.getCategoryId() : categoryResponses.getFirst().getId();
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getPageSize());
        var response = menuItemRepository.findByCategoryId(existingCategoryId, pageable)
                .map(menuMapper::toResponse);
        final PageResponse<MenuItemResponse> pageResponse = PageResponse.build(response);
        return new MenuResponse(storeId, categoryResponses, null, pageResponse);
    }

    public PageResponse<MenuItemResponse> search(final String storeId, final SearchMenuRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getPageSize());
        var response = menuItemRepository.searchByNameAndDescription(storeId, request.getKeyword(), pageable)
                .map(menuMapper::toResponse);
        return PageResponse.build(response);
    }

    public MenuItemResponse get(final String id) {
        var result = menuItemRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        return menuMapper.toResponse(result);
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
        MenuItem saved = menuItemRepository.save(menuItem);
        return menuMapper.toResponse(saved);
    }

    public void delete(final String id) {
        menuItemRepository.deleteById(id);
    }

    public MenuItemDTO getPriceAndAvailability(final String storeId, final String menuItemId) {
        Optional<Object[]> result = menuItemRepository.findPriceAndAvailability(storeId, menuItemId);
        if (result.isEmpty() || result.get().length == 0) {
            throw new AppException(ResourceException.ENTITY_NOT_FOUND, "Menu item not found");
        }
        Object[] row = result.get();
        BigDecimal price = (BigDecimal) row[0];
        Boolean available = (Boolean) row[1];
        return new MenuItemDTO(price, available);
    }


    @Transactional
    @Scheduled(cron = "0 0 0 * * ?")
    public void updatePopularItems() {
//        List<String> popularItemIds = orderRepository.findTopPopularItems(LocalDate.now().minusDays(1));
//
//        menuItemRepository.resetPopularItems();
//
//        if (!popularItemIds.isEmpty()) {
//            menuItemRepository.markPopularItems(popularItemIds);
//        }
    }
}
