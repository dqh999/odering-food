package com.scanmeally.domain.menu.dataTransferObject.request;

import lombok.Data;

@Data
public class CategoryUpdateRequest {
    private String name;
    private String description;
}
