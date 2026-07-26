package com.intellihire.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final OAuthSuccessHandler successHandler;

    public SecurityConfig(
            OAuthSuccessHandler successHandler
    ){

        this.successHandler = successHandler;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(
                        cors -> {}
                )

                .csrf(
                        csrf -> csrf.disable()
                )

                .authorizeHttpRequests(

                        auth -> auth

                                .requestMatchers(

                                        "/health",

                                        "/actuator/**",

                                        "/auth/**",

                                        "/logs"

                                )

                                .permitAll()

                                .anyRequest()

                                .authenticated()

                )

                .oauth2Login(

                        oauth ->

                                oauth.successHandler(

                                        successHandler

                                )

                );

        http.addFilterBefore(
                new OAuthRoleCaptureFilter(),
                OAuth2AuthorizationRequestRedirectFilter.class
        );

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){

        CorsConfiguration config =
                new CorsConfiguration();

        config.setAllowedOrigins(

                List.of(
                        "http://localhost:5173"
                )

        );

        config.setAllowedMethods(

                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )

        );

        config.setAllowedHeaders(

                List.of("*")

        );

        config.setAllowCredentials(
                true
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                config

        );

        return source;

    }

}