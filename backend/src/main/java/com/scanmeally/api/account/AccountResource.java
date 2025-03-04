package com.scanmeally.api.account;

import com.scanmeally.application.global.ApiResponse;
import com.scanmeally.domain.account.dataTransferObject.request.OAuth2LoginRequest;
import com.scanmeally.domain.account.dataTransferObject.response.AccountResponse;
import com.scanmeally.domain.account.dataTransferObject.response.OAuth2UrlResponse;
import com.scanmeally.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountResource {
    private final AccountService accountService;

    @GetMapping("/oauth2/login")
    public ResponseEntity<ApiResponse<OAuth2UrlResponse>> getOauth2Login(@RequestParam("loginType") String loginType) {
        var response = accountService.getOAuth2Url(loginType);
        return ApiResponse.<OAuth2UrlResponse>build().withData(response).toEntity();
    }

    /**
     * API for logging in with OAuth2 (Google, Facebook, GitHub, etc.)
     */
    @GetMapping("/oauth2/login/callback")
    public ResponseEntity<ApiResponse<AccountResponse>> oauth2Login(
            @RequestParam("loginType") String loginType,
            @RequestParam("code") String code
    ) {
        var request = new OAuth2LoginRequest(
                loginType,
                code
        );
        var response = accountService.oauth2Login(request);
        return ApiResponse.<AccountResponse>build().withData(response).toEntity();
    }


    /**
     * API for refreshing access tokens
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AccountResponse>> refreshToken(@RequestBody String refreshToken) {
        var response = accountService.refreshToken(refreshToken);
        return ApiResponse.<AccountResponse>build().withData(response).toEntity();
    }
}