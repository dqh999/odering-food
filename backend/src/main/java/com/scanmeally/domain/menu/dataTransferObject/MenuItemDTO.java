package com.scanmeally.domain.menu.dataTransferObject;


import java.math.BigDecimal;

public record MenuItemDTO(
        BigDecimal price,
        Boolean available
) {}