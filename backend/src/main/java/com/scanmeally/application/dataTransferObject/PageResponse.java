package com.scanmeally.application.dataTransferObject;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor @Getter
@Setter
@Builder
public class PageResponse<T> implements Serializable {
    private int totalElements;
    private int totalPages;
    private int currentPage;
    private int pageSize;
    private List<T> data;
    private boolean hasNext;
    private boolean hasPrevious;
}