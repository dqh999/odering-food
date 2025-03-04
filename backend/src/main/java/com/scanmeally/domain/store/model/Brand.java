package com.scanmeally.domain.store.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
public class Brand  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String ownerId;

}
