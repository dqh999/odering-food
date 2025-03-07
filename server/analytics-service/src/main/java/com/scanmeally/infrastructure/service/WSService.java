package com.scanmeally.infrastructure.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WSService {

    private final SimpMessagingTemplate messagingTemplate;

    public <T> void sendMessage(String destination, T message) {
        messagingTemplate.convertAndSend(destination, message);
    }
}