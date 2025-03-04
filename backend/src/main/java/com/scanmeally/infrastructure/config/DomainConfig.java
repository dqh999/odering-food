package com.scanmeally.infrastructure.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("com.scan_meally.my_app")
@EnableJpaRepositories("com.scan_meally.my_app")
@EnableTransactionManagement
public class DomainConfig {
}
