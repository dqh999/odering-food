package com.scanmeally.domain.menu.dataTransferObject.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class SearchMenuRequest {
    private String keyword;
    private int page;
    private int pageSize;
}
