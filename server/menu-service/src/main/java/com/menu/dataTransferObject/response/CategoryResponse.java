package com.menu.dataTransferObject.response;

import lombok.Data;

@Data
public class CategoryResponse {
    private String id;
    private String brandId;
    private String type;
    private String name;
    private String description;
}
