package com.scanmeally.domain.menu.dataTransferObject;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;


@Getter
@Setter
public class MenuItemDTO {

    private String id;

    
    private String storeId;

    
    private String categoryId;

    
    
    private String name;

    private String description;

    
    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "75.08")
    private BigDecimal price;

    @Size(max = 500)
    private String imageUrl;

    private Boolean available;

    

}
