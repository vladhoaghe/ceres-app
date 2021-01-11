package com.startup.apigateway.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
public class SecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;

    public SecurityConfigurerAdapter(CorsFilter corsFilter) {
        this.corsFilter = corsFilter;
    }

    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .addFilterAfter(corsFilter, ExceptionTranslationFilter.class)
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/login", "/register").permitAll()
            .and()
            .headers().frameOptions().sameOrigin().and()
            .httpBasic();
    }

}
