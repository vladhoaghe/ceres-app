package com.startup.apigateway.controller;

import com.startup.apigateway.dto.CredentialsRequest;
import com.startup.apigateway.dto.UserDto;
import com.startup.apigateway.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@AllArgsConstructor
@RestController
public class EnrollmentController {

    private final UserService userService;

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> register(
        @RequestBody @Valid CredentialsRequest request
    ) {
        log.info("Starting registration for user {}", request.getEmail());

        UserDto user = userService.createUser(request);
        return ResponseEntity.ok().body(user);
    }
}
