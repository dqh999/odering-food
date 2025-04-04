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
    private BigDecimal subtotal;
    @Column(name = "tax_rate")
    private Integer taxRate;
    private BigDecimal tax;
    @Column(name = "service_fee_rate")
    private Integer serviceFeeRate;
    @Column(name = "service_fee")
    private BigDecimal serviceFee;
    @Column(name = "shipping_fee")
    private BigDecimal shippingFee;
    private BigDecimal discount;
    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;
}
