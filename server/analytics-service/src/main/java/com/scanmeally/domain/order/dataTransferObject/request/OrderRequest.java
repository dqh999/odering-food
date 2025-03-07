package com.scanmeally.domain.order.dataTransferObject.request;

import lombok.Data;

@Data
public class OrderRequest {
    private String userNotes;
    private String paymentMethod;
}
