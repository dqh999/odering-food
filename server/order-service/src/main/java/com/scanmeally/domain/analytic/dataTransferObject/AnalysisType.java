package com.scanmeally.domain.analytic.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public enum AnalysisType {
    DAILY("DAILY"),
    WEEKLY("WEEKLY"),
    MONTHLY("MONTHLY"),
    YEARLY("YEARLY"),
    RANGE("RANGE"),
    ITEM("ITEM");

    private final String type;

    public TimeRange getTimeRange() {
        LocalDate today = LocalDate.now();
        switch (this) {
            case DAILY:
                return new TimeRange(today, today);
            case WEEKLY:
                LocalDate startOfWeek = today.minusDays(today.getDayOfWeek().getValue() - 1);
                LocalDate endOfWeek = startOfWeek.plusDays(6);
                return new TimeRange(startOfWeek, endOfWeek);
            case MONTHLY:
                LocalDate startOfMonth = today.withDayOfMonth(1);
                LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());
                return new TimeRange(startOfMonth, endOfMonth);
            case YEARLY:
                LocalDate startOfYear = today.withDayOfYear(1);
                LocalDate endOfYear = today.withDayOfYear(today.lengthOfYear());
                return new TimeRange(startOfYear, endOfYear);
            case RANGE:
                return null;
            case ITEM:
                return null;
            default:
                return null;
        }
    }

    public static AnalysisType fromString(String type) {
        for (AnalysisType analysisType : AnalysisType.values()) {
            if (analysisType.type.equalsIgnoreCase(type)) {
                return analysisType;
            }
        }
        return AnalysisType.DAILY;
    }
}