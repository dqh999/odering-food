package com.menu.dataTransferObject.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MenuItemResponse {
    private String id;
    private String storeId;
    private String categoryId;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageURL;
    private Boolean isPopular;
    private Boolean isBestseller;
    private Boolean available;
}
