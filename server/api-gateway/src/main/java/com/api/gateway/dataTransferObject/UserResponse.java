package com.api.gateway.dataTransferObject;


import java.util.List;

public class UserResponse {
    private Long userId;
    private List<String> roles;

    public UserResponse(Long userId, List<String> roles) {
        this.userId = userId;
        this.roles = roles;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}