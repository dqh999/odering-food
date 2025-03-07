package com.scanmeally.api;

import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.analytic.dataTransferObject.request.AnalysisRequest;
import com.scanmeally.domain.analytic.service.AnalyticService;
import com.scanmeally.domain.analytic.dataTransferObject.response.AnalysisResponse;
import com.scanmeally.domain.analytic.dataTransferObject.response.OrderAnalysisResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytic")
@RequiredArgsConstructor
@Tag(name = "Analytic API")
public class AnalyticController {
    private final AnalyticService analyticService;

    @GetMapping("/order/{storeId}")
    public ResponseEntity<ApiResponse<OrderAnalysisResponse>> analyzeOrder(@PathVariable String storeId) {
        var response = analyticService.analyzeOrder(storeId);
        return ApiResponse.<OrderAnalysisResponse>build().withData(response).toEntity();
    }

    @GetMapping("/{type}")
    public ResponseEntity<ApiResponse<AnalysisResponse>> analyze(
            @PathVariable String type,
            @RequestParam String brandId,
            @RequestParam(required = false) String storeId
    ) {
        var request = new AnalysisRequest();
        var response = analyticService.analyze(request);
        return ApiResponse.<AnalysisResponse>build().withData(response).toEntity();
    }

}
