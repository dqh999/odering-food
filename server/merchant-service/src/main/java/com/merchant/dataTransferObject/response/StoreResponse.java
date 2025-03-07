package com.merchant.dataTransferObject.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreResponse {
    private String id;
    private String brandId;
    private String name;
    private String address;
    private String phone;
}
