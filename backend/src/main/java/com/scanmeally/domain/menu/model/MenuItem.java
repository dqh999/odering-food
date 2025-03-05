package com.scanmeally.domain.menu.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;


@Entity
@Table(name = "menu_items")
@Getter
@Setter
public class MenuItem extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false, length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "store_id", nullable = false)
    private String storeId;

    @Column(name = "category_id", nullable = false)
    private String categoryId;

    @Column(nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "image_url", length = 500)
    private String imageURL;

    @Column(columnDefinition = "tinyint", length = 1)
    private Boolean available;

}
