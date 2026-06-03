package com.intellihire.auth.service;


import com.intellihire.auth.dto.*;

import com.intellihire.auth.entity.AuthUser;

import com.intellihire.auth.repository.AuthRepository;

import com.intellihire.auth.util.JwtUtil;


import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;


import java.util.Map;


@Service
public class AuthService {


    private final AuthRepository repository;


    private final PasswordEncoder encoder;


    public AuthService(

            AuthRepository repository,

            PasswordEncoder encoder

    ){

        this.repository=repository;

        this.encoder=encoder;

    }



    public AuthUser signup(

            SignupRequest request

    ){


        AuthUser user=

                AuthUser.builder()

                        .name(request.getName())

                        .email(request.getEmail())

                        .password(

                                encoder.encode(

                                        request.getPassword()

                                )

                        )

                        .provider("LOCAL")

                        .build();


        return repository.save(user);

    }



    public Map<String,String> login(

            LoginRequest request

    ){


        AuthUser user=

                repository.findByEmail(

                        request.getEmail()

                ).orElseThrow();



        if(

                !encoder.matches(

                        request.getPassword(),

                        user.getPassword()

                )

        ){

            throw new RuntimeException(

                    "Wrong password"

            );

        }


        String token=

                JwtUtil.generateToken(

                        user.getEmail()

                );


        return Map.of(

                "token",

                token

        );

    }

}