package com.scanmeally.domain.table.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
public class QrCode  extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String tableId;

    @Column(nullable = false, columnDefinition = "Stringtext")
    private String qrCode;

    @Column(columnDefinition = "Stringtext")
    private String url;

}
