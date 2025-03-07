plugins {
	java
//	id("org.jetbrains.kotlin.kapt")
	id("org.springframework.boot") version "3.4.2"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.scanmeally"
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

	implementation("com.google.api-client:google-api-client:2.7.2")
	implementation("com.google.oauth-client:google-oauth-client-jetty:1.34.1")

	implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.18.2")

	implementation("org.springframework.boot:spring-boot-starter-websocket")

	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
