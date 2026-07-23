package com.intellihire.auth.service;


import com.intellihire.auth.dto.*;

import com.intellihire.auth.entity.AuthUser;
import com.intellihire.auth.entity.Role;
import com.intellihire.auth.entity.RefreshToken;

import com.intellihire.auth.repository.AuthRepository;

import com.intellihire.auth.util.JwtUtil;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;


@Slf4j
@Service
public class AuthService {
    private final AuthRepository repository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshService;

    public AuthService(
            AuthRepository repository,
            PasswordEncoder encoder,
            JwtUtil jwtUtil,
            RefreshTokenService refreshService
    ){
        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
    }



    public AuthUser signup(SignupRequest request)
    {
        AuthUser user =
                AuthUser.builder()

                        .name(
                                request.getName()
                        )

                        .email(
                                request.getEmail()
                        )

                        .password(

                                encoder.encode(

                                        request.getPassword()

                                )

                        )

                        .provider(
                                "LOCAL"
                        )

                        .role(
                                Role.USER
                        )

                        .build();


        AuthUser savedUser =
                repository.save(user);


        log.info(

                "ACTION={} service={} user={} details={}",

                "USER_SIGNUP",

                "AUTH-SERVICE",

                savedUser.getEmail(),

                "New local account created"

        );


        return savedUser;

    }



    public AuthResponse login(LoginRequest request)
    {
        AuthUser user =
                repository.findByEmail(
                        request.getEmail()
                ).orElseThrow();


        if(
                !encoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )
        ){


            log.warn(

                    "ACTION={} service={} user={} details={}",

                    "LOGIN_FAILED",

                    "AUTH-SERVICE",

                    request.getEmail(),

                    "Invalid password attempt"

            );


            throw new RuntimeException(
                    "Wrong password"
            );


        }

        String access = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        RefreshToken refresh = refreshService.create(user);

        log.info(

                "ACTION={} service={} user={} details={}",

                "LOGIN_SUCCESS",

                "AUTH-SERVICE",

                user.getEmail(),

                "JWT access and refresh tokens generated"

        );

        return AuthResponse
                .builder()

                .accessToken(
                        access
                )

                .refreshToken(
                        refresh.getToken()
                )

                .userId(
                        user.getId()
                )

                .email(
                        user.getEmail()
                )

                .role(
                        user.getRole().name()
                )

                .build();

    }

}