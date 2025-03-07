package com.menu.dataTransferObject.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class GetMenuRequest {
    private String categoryId;
    private int page;
    private int pageSize;
    private String sortBy;
}
