package com.ecommerce.api.controller;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private long timestamp;

    public ErrorResponse() {}

    public ErrorResponse(int status, String message, long timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
}
