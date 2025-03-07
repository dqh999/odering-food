package com.menu.util;


import java.security.SecureRandom;

public class OrderCodeGenerator {
    private static final String PREFIX = "ORD";
    private static final int CODE_LENGTH = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateOrderCode() {
        int randomNumber = RANDOM.nextInt(100_000);
        String orderNumberStr = String.format("%05d", randomNumber);
        return PREFIX + orderNumberStr;
    }
}
