package com.scanmeally.domain.order.dataTransferObject;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;


@Getter
@Setter
public class OrderItemDTO {

    private String id;

 
    private String orderId;

 
    private String menuItemId;

 
    private Integer quantity;

 
//    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
//    @Schema(type = "string", example = "75.08")
    private BigDecimal price;

    

}
