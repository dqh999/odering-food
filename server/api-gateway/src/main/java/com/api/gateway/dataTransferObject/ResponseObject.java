package com.api.gateway.dataTransferObject;
import org.springframework.http.HttpStatus;

public class ResponseObject {
    private HttpStatus status;
    private Object message;
    private UserResponse data;

    public ResponseObject(HttpStatus status, Object message, UserResponse data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    public UserResponse getData() {
        return data;
    }

    public void setData(UserResponse data) {
        this.data = data;
    }
}