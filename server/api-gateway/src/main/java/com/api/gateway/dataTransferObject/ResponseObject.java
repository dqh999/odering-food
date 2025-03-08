package com.api.gateway.dataTransferObject;
import org.springframework.http.HttpStatus;

public class ResponseObject {
    private HttpStatus status;
    private Object message;
    private InternalAuthResponse data;

    public ResponseObject(HttpStatus status, Object message, InternalAuthResponse data) {
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

    public InternalAuthResponse getData() {
        return data;
    }

    public void setData(InternalAuthResponse data) {
        this.data = data;
    }
}