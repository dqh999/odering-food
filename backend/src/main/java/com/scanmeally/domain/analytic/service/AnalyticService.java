package com.scanmeally.domain.analytic.service;

import com.scanmeally.domain.analytic.dataTransferObject.TimeRange;
import com.scanmeally.domain.analytic.dataTransferObject.request.AnalysisRequest;
import com.scanmeally.domain.analytic.dataTransferObject.response.AnalysisResponse;
import com.scanmeally.domain.order.dataTransferObject.OrderCountAndRevenueDTO;
import com.scanmeally.domain.order.dataTransferObject.OrderStatisticsDTO;
import com.scanmeally.domain.analytic.dataTransferObject.response.OrderAnalysisResponse;
import com.scanmeally.domain.order.dataTransferObject.PopularMenuItemDTO;
import com.scanmeally.domain.order.model.OrderStatus;
import com.scanmeally.domain.order.repository.OrderRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AnalyticService {
    private final OrderRepository orderRepository;

    public AnalysisResponse analyze(AnalysisRequest request) {
        TimeRange timeRange = request.getType().getTimeRange();
        if (timeRange == null) {
            timeRange = new TimeRange(request.getStartDate(), request.getEndDate());
        }
        Pageable popularMenuItemPageable = PageRequest.of(0, 5);
        Page<PopularMenuItemDTO> popularMenuItemPage = orderRepository.getPopularMenuItemsByDateRange(timeRange.startDate(), timeRange.endDate(), popularMenuItemPageable);

        return new AnalysisResponse();
    }

    public OrderAnalysisResponse analyzeOrder(String storeId) {
        var currentDate = LocalDate.now();
        var previousDate = currentDate.minusDays(1);
        OrderStatisticsDTO orderStatistics = orderRepository.getOrderStatistics(
                storeId, currentDate,
                OrderStatus.getActiveStatuses()
        ).orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        OrderCountAndRevenueDTO totalOrderAndRevenueYesterday = orderRepository.getOrderCountAndRevenue(storeId, previousDate)
                .orElse(new OrderCountAndRevenueDTO(0, BigDecimal.ZERO));

        BigDecimal growthPercentageRevenue = calculateGrowthPercentage(
                totalOrderAndRevenueYesterday.getTotalRevenue(),
                orderStatistics.getTotalRevenue()
        );
        BigDecimal growthPercentageOrders = calculateGrowthPercentage(
                totalOrderAndRevenueYesterday.getTotalOrders(),
                orderStatistics.getTotalOrders()
        );
        return new OrderAnalysisResponse(
                orderStatistics.getTotalOrders(),
                growthPercentageOrders,
                orderStatistics.getActiveOrders(),
                orderStatistics.getCompletedOrders(),
                orderStatistics.getTotalRevenue(),
                growthPercentageRevenue
        );

    }

    private BigDecimal calculateGrowthPercentage(Number previousValue, Number currentValue) {
        if (previousValue == null || previousValue.doubleValue() == 0) {
            return BigDecimal.valueOf(100);
        }

        BigDecimal previous = new BigDecimal(previousValue.toString());
        BigDecimal current = new BigDecimal(currentValue.toString());

        return current.subtract(previous)
                .divide(previous, 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
    }
}
