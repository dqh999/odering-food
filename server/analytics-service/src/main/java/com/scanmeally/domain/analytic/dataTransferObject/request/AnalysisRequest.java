package com.scanmeally.domain.analytic.dataTransferObject.request;

import com.scanmeally.domain.analytic.dataTransferObject.AnalysisType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AnalysisRequest {
    private AnalysisType type;
    private String brandId;
    private String orderId;
    private LocalDate startDate;
    private LocalDate endDate;
}
