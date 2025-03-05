package com.scanmeally.domain.menu.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "store_menu_items")
@Getter
@Setter
public class StoreMenuItem extends BaseEntity {
    @Id
    @Column(nullable = false, updatable = false, length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "store_id")
    private String storeId;
    @Column(name = "item_id")
    private String itemId;
    private Boolean available;
}
