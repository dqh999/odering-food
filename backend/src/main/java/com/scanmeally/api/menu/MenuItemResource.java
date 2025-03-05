package com.scanmeally.api.menu;

import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemRequest;
import com.scanmeally.domain.menu.dataTransferObject.request.MenuItemUpdateRequest;
import com.scanmeally.domain.menu.dataTransferObject.response.MenuItemResponse;
import com.scanmeally.domain.menu.service.MenuItemService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/menu", produces = MediaType.APPLICATION_JSON_VALUE)
public class MenuItemResource {

    private final MenuItemService menuItemService;

    public MenuItemResource(final MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping("/{menuItemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItem(@PathVariable(name = "menuItemId") final String menuItemId) {
        final var response = menuItemService.get(menuItemId);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @PostMapping("/{storeId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(
            @PathVariable(name = "storeId") final String storeId,
            @RequestBody final MenuItemRequest request
    ) {
        final var response = menuItemService.create(storeId, request);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @PutMapping("/{menuItemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable(name = "menuItemId") final String menuItemId,
            @RequestBody final MenuItemUpdateRequest request
    ) {
        final var response = menuItemService.update(menuItemId, request);
        return ApiResponse.<MenuItemResponse>build().withData(response).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable(name = "id") final String id) {
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
