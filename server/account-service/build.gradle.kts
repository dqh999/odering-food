plugins {
	java
//	id("org.jetbrains.kotlin.kapt")
	id("org.springframework.boot") version "3.4.2"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.account"
version = "0.0.1"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.0")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
	implementation("com.nimbusds:nimbus-jose-jwt:9.1")

	implementation("com.google.api-client:google-api-client:2.7.2")
	implementation("com.google.oauth-client:google-oauth-client-jetty:1.34.1")

	implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.18.2")

	implementation("org.springframework.data:spring-data-redis:3.4.1")
	implementation("redis.clients:jedis:4.4.3")

	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	runtimeOnly("com.mysql:mysql-connector-j")

	implementation("org.springframework.boot:spring-boot-starter-web")

	implementation("org.mapstruct:mapstruct:1.6.3")
//	implementation("org.mapstruct:mapstruct-processor:1.6.3")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")

	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
