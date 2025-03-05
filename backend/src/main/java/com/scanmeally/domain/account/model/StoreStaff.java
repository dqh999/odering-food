package com.scanmeally.domain.account.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Table(name = "store_staffs")
@Getter
@Setter
public class StoreStaff extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String storeId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, name = "\"role\"", length = 20)
    private String role;

}
