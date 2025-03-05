package com.scanmeally;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootTest
@ComponentScan(basePackages = "com.scanmeally")
@EnableJpaRepositories(basePackages = "com.scanmeally.domain")
@EntityScan(basePackages = "com.scanmeally.domain")
class ApplicationTests {
	@Test
	void contextLoads() {
	}

}
