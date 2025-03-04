package com.scanmeally.domain.payment.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
public class Payment  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false, length = 20)
    private String paymentMethod;

    @Column(length = 20)
    private String status;

    @Column
    private OffsetDateTime paidAt;


}
