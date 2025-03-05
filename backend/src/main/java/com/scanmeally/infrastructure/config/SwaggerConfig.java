package com.scanmeally.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;


import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi publicApi(@Value("${spring.openapi.service.api-docs}") String apiDocs) {
        return GroupedOpenApi.builder()
                .group(apiDocs)
                .pathsToMatch("/**")
                .packagesToScan("com.scanmeally.api")
                .build();
    }

    @Bean
    public OpenAPI openAPI(
            @Value("${spring.openapi.service.title}") String title,
            @Value("${spring.openapi.service.version}") String version,
            @Value("${spring.openapi.service.server}") List<String> serverUrls) {
        List<Server> servers = serverUrls.stream()
                .map(url -> new Server().url(url))
                .collect(Collectors.toList());
        return new OpenAPI()
                .servers(servers)
                .info(new Info().title(title)
                        .description("API documents")
                        .version(version)
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")));
    }
}
