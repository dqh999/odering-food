package com.merchant.model;

import com.merchant.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "stores")
@Getter
@Setter
public class Store  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "brand_id", nullable = false)
    private String brandId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "Stringtext")
    private String address;

    @Column(length = 20)
    private String phone;
}
