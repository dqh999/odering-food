package com.api.gateway.dataTransferObject;


import java.util.List;

public class InternalAuthResponse {
    private Long userId;
    private String userName;
    private List<String> roles;

    public InternalAuthResponse(Long userId, String userName, List<String> roles) {
        this.userId = userId;
        this.userName = userName;
        this.roles = roles;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}