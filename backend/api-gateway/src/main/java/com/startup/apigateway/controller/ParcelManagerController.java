package com.startup.apigateway.controller;

import com.startup.apigateway.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.mvc.ProxyExchange;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import static com.startup.apigateway.security.Roles.ROLE_USER;

@RestController
@Secured(ROLE_USER)
public class ParcelManagerController {

    @Value("${remote.home}")
    String home;

    @Value("${signature.secret}")
    private String secret;

    private final UserService userService;

    public ParcelManagerController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/parcels")
    public ResponseEntity<?> createParcel(
            @RequestHeader(value = "Authorization") String jwt,
            ProxyExchange<byte[]> proxyExchange) {
        Long userId = getCurrentUserId(jwt);
        return proxyExchange.uri(home + "/parcels/" + userId.toString()).post();
    }

    @GetMapping(value = "/parcels")
    public ResponseEntity<?> getParcels(
            @RequestHeader(value = "Authorization") String jwt,
            ProxyExchange<byte[]> proxyExchange) {
        Long userId = getCurrentUserId(jwt);
        return proxyExchange.uri(home + "/parcels/" + userId.toString()).get();
    }

    @GetMapping(value = "/parcels/{id}")
    public ResponseEntity<?> getParcelDetails(
            @RequestHeader(value = "Authorization") String jwt,
            @PathVariable Long id,
            ProxyExchange<byte[]> proxyExchange) {
        Long userId = getCurrentUserId(jwt);
        return proxyExchange.uri(home + "/parcels/" + userId.toString() + "/" + id.toString()).get();
    }

    private Long getCurrentUserId(String jwt) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(jwt.substring(7)).getBody();
        return userService.getUserId(claims.getSubject());
    }
}
