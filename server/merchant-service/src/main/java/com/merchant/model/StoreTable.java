package com.merchant.model;

import com.merchant.util.BaseEntity;
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

    @Column(name = "store_id", nullable = false)
    private String storeId;

    @Column(name = "table_number", nullable = false, length = 20)
    private String tableNumber;

    @Column
    private Boolean available;
}
