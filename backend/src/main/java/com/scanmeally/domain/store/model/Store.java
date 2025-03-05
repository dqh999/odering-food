package com.scanmeally.domain.store.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Table(name = "stores")
@Getter
@Setter
public class Store  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String brandId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "Stringtext")
    private String address;

    @Column(length = 20)
    private String phone;
}
