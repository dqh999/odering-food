package com.scanmeally.domain.analytic.service;

import com.scanmeally.domain.analytic.repository.OrderAnalysisRepository;
import com.scanmeally.domain.order.dataTransferObject.response.OrderResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticService {
    private final OrderAnalysisRepository orderAnalysisRepository;

    @KafkaListener(
            topics = "${spring.kafka.topic.order.update}",
            groupId = "${spring.kafka.consumer-group.order-analytics}"
    )
    public void consumerOrderUpdate(OrderResponse order) {
        log.info("Received order id update: {}", order.getId());
    }

    @KafkaListener(
            topics = "${spring.kafka.topic.order.delete}",
            groupId = "${spring.kafka.consumer-group.order-analytics}"
    )
    public void consumerOrderDelete(String orderId) {
        log.info("Received order id delete: {}", orderId);
    }
}
