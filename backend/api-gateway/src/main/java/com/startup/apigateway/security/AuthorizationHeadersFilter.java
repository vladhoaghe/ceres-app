package com.startup.apigateway.security;

import com.startup.apigateway.service.exception.UnauthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AuthorizationHeadersFilter implements Filter {

    @Value("${signature.secret}")
    private String secret;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String path = httpRequest.getServletPath();
            String token = resolveToken((HttpServletRequest) request);

            // jwt filter should be applied only for non login and register endpoints
            if (path != null && !path.contains("/login") && !path.contains("/register") && validate(token)) {
                Authentication authentication = authentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("Invalid token: {}", e.getMessage());
            throw new UnauthorizedException("Unauthorized request");
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if (jwt == null || jwt.isEmpty() || !jwt.startsWith("Bearer ")) {
            return "";
        }
        return jwt.substring(7);
    }

    public Boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.error(e.getMessage(), e);
            return false;
        }
        return true;
    }

    public Authentication authentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        List<SimpleGrantedAuthority> grantedAuthorities = Arrays.stream(claims.get("authorities").toString().split(","))
                .map(e -> e.replace("[", "").replace("]", "").trim())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        User user = new User(claims.getSubject(), "", grantedAuthorities);

        return new UsernamePasswordAuthenticationToken(user, "", grantedAuthorities);
    }
}
