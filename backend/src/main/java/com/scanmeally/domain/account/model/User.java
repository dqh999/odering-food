package com.scanmeally.domain.account.model;

import com.scanmeally.infrastructure.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class User extends BaseEntity {

    @Id
    @Column(nullable = false, updatable = false, length = 45)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Column(name = "provider_name")
    String providerName;
    @Column(name = "provider_user_id", unique = true)
    String providerUserId;
    @Column(name = "full_name")
    String fullName;
    @Column(name = "avatar_url")
    String avatarUrl;
    @Column
    private String email;
    @Column(length = 20)
    private String phone;
    private String password;
}
