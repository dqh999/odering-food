package com.scanmeally.domain.store.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "store_tables")
@Getter
@Setter
public class StoreTable extends BaseEntity {

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
