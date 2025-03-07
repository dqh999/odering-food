package com.scanmeally.domain.order.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false, length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "code", nullable = false, length = 20, unique = true)
    private String code;

    @Column(name = "table_id", nullable = false)
    private String tableId;

    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_notes")
    private String userNotes;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<OrderItem> orderItems = new HashSet<>();

    @Embedded
    private OrderPricing pricing;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
