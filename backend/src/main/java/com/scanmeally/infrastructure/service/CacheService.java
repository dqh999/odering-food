package com.scanmeally.infrastructure.service;

import java.time.Duration;
import java.util.Optional;

public interface CacheService {
    void set(String key, Object value, Duration ttl);
    <T> Optional<T> get(String key, Class<T> type);
    void delete(String key);
    boolean exists(String key);
}
