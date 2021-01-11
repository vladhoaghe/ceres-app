package com.startup.apigateway.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class ApiGatewayException extends RuntimeException {
    public ApiGatewayException() {
    }

    public ApiGatewayException(String message) {
        super(message);
    }

    public ApiGatewayException(String message, Throwable cause) {
        super(message, cause);
    }
}
