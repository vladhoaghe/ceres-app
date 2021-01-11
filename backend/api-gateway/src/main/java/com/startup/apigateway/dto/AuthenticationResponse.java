package com.startup.apigateway.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private final String user;
    private final String authority;
    private final String jwt;
}
