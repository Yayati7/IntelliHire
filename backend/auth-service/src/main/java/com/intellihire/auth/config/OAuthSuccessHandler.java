package com.intellihire.auth.config;


import com.intellihire.auth.entity.AuthUser;

import com.intellihire.auth.repository.AuthRepository;

import com.intellihire.auth.util.JwtUtil;


import jakarta.servlet.ServletException;

import jakarta.servlet.http.*;


import org.springframework.security.core.Authentication;

import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


import org.springframework.stereotype.Component;


import java.io.IOException;


@Component
public class OAuthSuccessHandler

        implements AuthenticationSuccessHandler {


    private final AuthRepository repository;


    public OAuthSuccessHandler(

            AuthRepository repository

    ){

        this.repository=repository;

    }



    @Override

    public void onAuthenticationSuccess(

            HttpServletRequest request,

            HttpServletResponse response,

            Authentication authentication

    )throws IOException,ServletException{


        OAuth2User oauthUser=

                (OAuth2User)

                        authentication.getPrincipal();


        String email=

                oauthUser.getAttribute("email");


        String name=

                oauthUser.getAttribute("name");



        AuthUser user=

                repository.findByEmail(email)

                        .orElseGet(()->


                                repository.save(

                                        AuthUser.builder()

                                                .email(email)

                                                .name(name)

                                                .provider("GOOGLE")

                                                .build()

                                )

                        );



        String token=

                JwtUtil.generateToken(

                        user.getEmail()

                );



        response.sendRedirect(

                "http://localhost:5173/login-success?token="

                        +token

        );


    }

}