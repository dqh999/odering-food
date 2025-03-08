package com.scanmeally.domain.store.dataTransferObject.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreRequest {
    private String name;
    private String address;
    private String phone;
}
