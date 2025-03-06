package com.scanmeally.domain.store.dataTransferObject.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableResponse {
    private String id;
    private String tableNumber;
    private String status;
    private String currentOrderCode;

    public String getStatus() {
        return status;
    }
}
