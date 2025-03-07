package com.menu.dataTransferObject.response;

import com.menu.util.PageResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data @AllArgsConstructor
public class MenuResponse {
    private String storeId;
    private List<CategoryResponse> categories;
    private List<MenuItemResponse> bestSellers;
    private PageResponse<MenuItemResponse> menuItems;
}
