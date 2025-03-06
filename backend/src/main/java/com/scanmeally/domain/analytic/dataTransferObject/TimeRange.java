package com.scanmeally.domain.analytic.dataTransferObject;

import java.time.LocalDate;

public record TimeRange (LocalDate startDate, LocalDate endDate) {
}