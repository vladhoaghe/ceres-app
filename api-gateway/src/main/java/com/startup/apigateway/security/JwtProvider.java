package com.startup.apigateway.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Date;

@Slf4j
@Component
public class JwtProvider {

    @Value("${signature.secret}")
    private String secret;

    public String generateToken(String userIdentifier, String authority, int ttl) {
        Date expirationDate = Date.from(ZonedDateTime.now().plusMinutes(ttl).toInstant());

        return Jwts.builder()
                .setSubject(userIdentifier)
                .claim("authorities", Collections.singletonList(authority))
                .signWith(SignatureAlgorithm.HS512, secret)
                .setExpiration(expirationDate)
                .compact();
    }
}
