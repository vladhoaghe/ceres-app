package com.startup.apigateway.controller;

import com.startup.apigateway.dto.AuthenticationResponse;
import com.startup.apigateway.dto.CredentialsRequest;
import com.startup.apigateway.service.AuthenticationService;
import com.startup.apigateway.service.exception.ApiGatewayException;
import com.startup.apigateway.service.exception.UnauthorizedException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static com.startup.apigateway.security.Roles.ROLE_USER;

@Slf4j
@AllArgsConstructor
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private static final String JWT_HEADER = "Auth";

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<AuthenticationResponse> authenticate (
        @RequestBody CredentialsRequest request,
        HttpServletResponse response
    ) {
        String userEmail = request.getEmail();
        log.info("Create session for {}", userEmail);

        try {
            String accessToken = authenticationService.authenticate(userEmail, request.getPassword());
            response.addHeader(JWT_HEADER, "Bearer " + accessToken);

            log.info("Authentication successful for {}", userEmail);
            return ResponseEntity.ok().body(new AuthenticationResponse(userEmail, ROLE_USER, accessToken));

        } catch (BadCredentialsException exception) {
            log.error("Failed authentication ", exception);
            throw new UnauthorizedException("Unauthorized request");
        } catch (Exception exception) {
            log.error("Failed authentication ", exception);
            throw new ApiGatewayException("Failed to authenticate");
        }
    }
}
