package com.account.model;

import com.account.util.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "store_staffs")
@Getter
@Setter
public class StoreStaff extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false,length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "store_id", nullable = false)
    private String storeId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false, name = "role", length = 20)
    private String role;

}
