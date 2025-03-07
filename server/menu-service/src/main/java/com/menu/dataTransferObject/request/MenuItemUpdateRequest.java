package com.menu.dataTransferObject.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MenuItemUpdateRequest {
    private String categoryId;
    private String description;
    private BigDecimal price;
    private String imageURL;
}
