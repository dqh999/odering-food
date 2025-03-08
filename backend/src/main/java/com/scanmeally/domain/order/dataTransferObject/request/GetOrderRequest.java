package com.scanmeally.domain.order.dataTransferObject.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor @Getter
public class GetOrderRequest {
    private String keyword;
    private int page;
    private int pageSize;
}
