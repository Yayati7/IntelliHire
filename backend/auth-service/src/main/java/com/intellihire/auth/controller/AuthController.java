package com.intellihire.auth.controller;


import com.intellihire.auth.dto.*;

import com.intellihire.auth.entity.AuthUser;

import com.intellihire.auth.service.AuthService;


import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController

@RequestMapping("/auth")
public class AuthController {


    private final AuthService service;


    public AuthController(

            AuthService service

    ){

        this.service=service;

    }


    @PostMapping("/signup")

    public AuthUser signup(

            @RequestBody SignupRequest request

    ){

        return service.signup(request);

    }



    @PostMapping("/login")

    public Map<String,String> login(

            @RequestBody LoginRequest request

    ){

        return service.login(request);

    }


}