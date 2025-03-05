package com.scanmeally.infrastructure.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    private final HttpServletRequest request;

    public SessionService(HttpServletRequest request) {
        this.request = request;
    }

    public String getSessionId() {
        return request.getSession().getId();
    }
}