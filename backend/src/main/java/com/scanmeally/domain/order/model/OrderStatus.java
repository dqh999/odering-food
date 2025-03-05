package com.scanmeally.domain.order.model;

public enum OrderStatus {
    PENDING,           // Đơn hàng mới tạo, chưa xác nhận
    PAID,              // Thanh toán thành công
    CONFIRMED,         // Đơn hàng đã được xác nhận bởi nhà hàng
    IN_PROGRESS,       // Đơn hàng đang được chế biến
    READY,             // Đơn hàng đã sẵn sàng để giao cho khách
    COMPLETED,         // Đơn hàng đã hoàn tất
    CANCELLED,         // Đơn hàng bị hủy
    REFUNDED,          // Hoàn tiền cho đơn hàng
    FAILED;             // Lỗi trong quá trình xử lý đơn hàng

    public boolean isValidTransition(OrderStatus newStatus) {
        return switch (this) {
            case PENDING -> newStatus == OrderStatus.CONFIRMED || newStatus == OrderStatus.CANCELLED;
            case CONFIRMED -> newStatus == IN_PROGRESS || newStatus == CANCELLED;
            case IN_PROGRESS -> newStatus == READY;
            case READY -> newStatus == COMPLETED || newStatus == CANCELLED;
            default -> false;
        };
    }
}