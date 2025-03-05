package com.scanmeally.api.menu;

import com.scanmeally.infrastructure.util.PageResponse;
import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.menu.dataTransferObject.request.GetMenuRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.SearchMenuRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuResponse;
import com.scanmeally.domain.menu.service.MenuService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/menu", produces = MediaType.APPLICATION_JSON_VALUE)
public class MenuResource {

    private final MenuService menuService;

    public MenuResource(final MenuService menuService) {
        this.menuService = menuService;
    }


    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<ApiResponse<PageResponse<MenuItemResponse>>> searchMenu(
            @PathVariable String storeId,
            @RequestParam String keyword,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize
    ) {
        var request = new SearchMenuRequest(keyword, page, pageSize);
        var response = menuService.search(storeId, request);
        return ApiResponse.<PageResponse<MenuItemResponse>>build().withData(response).toEntity();
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<ApiResponse<MenuResponse>> getMenu(
            @PathVariable final String storeId,
            @RequestParam(name = "categoryId", required = false) String categoryId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "pageSie", defaultValue = "10") int pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy

    ) {
        var request = new GetMenuRequest(categoryId, page, pageSize, sortBy);
        var response = menuService.getMenu(storeId, request);
        return ApiResponse.<MenuResponse>build().withData(response).toEntity();
    }

    @GetMapping("/{menuItemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItem(@PathVariable(name = "menuItemId") final String menuItemId) {
        final var response = menuService.get(menuItemId);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @PostMapping("/{storeId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(
            @PathVariable(name = "storeId") final String storeId,
            @RequestBody final MenuItemRequest request
    ) {
        final var response = menuService.create(storeId, request);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{menuItemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable(name = "menuItemId") final String menuItemId,
            @RequestBody final MenuItemUpdateRequest request
    ) {
        final var response = menuService.update(menuItemId, request);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable(name = "id") final String id) {
        menuService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
