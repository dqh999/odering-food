package com.scanmeally.domain.order.dataTransferObject;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;


@Getter
@Setter
public class OrderDTO {

    private String id;

    private String storeId;

    private String tableId;

    private String userId;

    private String status;


    private BigDecimal totalPrice;

    

}
