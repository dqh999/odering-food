package com.scanmeally.domain.menu.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "brand_categories")
@Getter
@Setter
public class Category  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "brand_id")
    private String brandId;
    private String type;
    @Column(nullable = false)
    private String name;
    private String description;
}
