package com.scanmeally.domain.table.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
public class Table  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String storeId;

    @Column(nullable = false, length = 20)
    private String tableNumber;

    @Column(length = 20)
    private String status;

}
