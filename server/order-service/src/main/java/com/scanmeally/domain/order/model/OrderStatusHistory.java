package com.scanmeally.domain.order.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "order_status_history")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OrderStatusHistory extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false, length = 45)
    private String id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(nullable = false)
    private OffsetDateTime changedAt;

    @Column(name = "changed_by_id", length = 45)
    private String changedById;

    @Column
    private String reason;
}
