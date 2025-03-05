package com.scanmeally.domain.order.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.math.BigDecimal;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderPricing {
    @Column(name = "sub_total")
    private BigDecimal subtotal = BigDecimal.ZERO;
    @Column(name = "tax_rate")
    private Integer taxRate = 0;
    private BigDecimal tax = BigDecimal.ZERO;
    @Column(name = "service_fee_rate")
    private Integer serviceFeeRate = 0;
    @Column(name = "service_fee")
    private BigDecimal serviceFee = BigDecimal.ZERO;
    @Column(name = "shipping_fee")
    private BigDecimal shippingFee = BigDecimal.ZERO;
    private BigDecimal discount = BigDecimal.ZERO;
    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;
}
