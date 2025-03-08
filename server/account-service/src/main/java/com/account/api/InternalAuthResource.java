package com.account.api;

import com.account.dataTransferObject.UserDetailDTO;
import com.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/internal/auth")
@RequiredArgsConstructor
public class InternalAuthResource {
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<UserDetailDTO> internalAuth() {
        var response = accountService.getCurrentUser();
        return ResponseEntity.ok(response);
    }
}
