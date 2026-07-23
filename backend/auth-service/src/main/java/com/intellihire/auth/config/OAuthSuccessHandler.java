package com.intellihire.auth.config;


import com.intellihire.auth.entity.AuthUser;
import com.intellihire.auth.entity.Role;

import com.intellihire.auth.repository.AuthRepository;

import com.intellihire.auth.util.JwtUtil;


import jakarta.servlet.ServletException;

import jakarta.servlet.http.*;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


import org.springframework.stereotype.Component;


import java.io.IOException;

@Slf4j
@Component
public class OAuthSuccessHandler

        implements AuthenticationSuccessHandler {


    private final AuthRepository repository;
    private final JwtUtil jwtUtil;

    public OAuthSuccessHandler(AuthRepository repository, JwtUtil jwtUtil
    ){

        this.repository = repository;

        this.jwtUtil = jwtUtil;

    }



    @Override
    public void onAuthenticationSuccess(

            HttpServletRequest request,

            HttpServletResponse response,

            Authentication authentication

    )throws IOException, ServletException{


        OAuth2User oauthUser =

                (OAuth2User)

                        authentication.getPrincipal();



        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        AuthUser user =

                repository.findByEmail(email)

                        .orElseGet(() ->


                                repository.save(

                                        AuthUser.builder()

                                                .email(
                                                        email
                                                )

                                                .name(
                                                        name
                                                )

                                                .provider(
                                                        "GOOGLE"
                                                )

                                                .role(
                                                        Role.USER
                                                )

                                                .build()

                                )

                        );



        String token = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

        log.info(

                "ACTION={} service={} user={} details={}",

                "GOOGLE_LOGIN",

                "AUTH-SERVICE",

                email,

                "OAuth2 authentication successful"

        );

        response.sendRedirect(

                "http://localhost:5173/login-success?token="

                        + token

        );


    }

}