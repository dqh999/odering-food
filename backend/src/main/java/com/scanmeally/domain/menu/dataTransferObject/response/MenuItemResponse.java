package com.scanmeally.domain.menu.dataTransferObject.response;

import lombok.Data;

@Data
public class MenuItemResponse {
    private String id;
    private String storeId;
    private String categoryId;
    private String name;
    private String description;
    private String imageURL;
    private Boolean available;
}
