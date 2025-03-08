package com.api.gateway.filter;

import com.api.gateway.dataTransferObject.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<Object> {
    private final WebClient webClient;
    private static final String X_USER_ID = "X-USER-ID";
    private static final String X_ROLE_ID = "X-ROLE-ID";

    @Autowired
    public AuthFilter(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (token == null || !token.startsWith("Bearer ")) {
                return chain.filter(exchange);
            }

            token = token.substring(7);
            return webClient.post()
                    .uri("https://auth-service-production-4f11.up.railway.app/api/v1/auth/validateToken")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError(),
                            _ -> Mono.error(new RuntimeException("Unauthorized")))                    .bodyToMono(ResponseObject.class)
                    .flatMap(responseObject -> chain.filter(
                                exchange.mutate()
                                        .request(exchange.getRequest().mutate()
                                                .header(X_USER_ID, responseObject.getData().getUserId().toString())
                                                .header(X_ROLE_ID, responseObject.getData().getRoles().toString())
                                                .build()
                                        ).build()
                        )
                    );
        };
    }
}
