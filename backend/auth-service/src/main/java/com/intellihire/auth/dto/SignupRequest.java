package com.intellihire.auth.dto;


import lombok.*;


@Getter
@Setter
public class SignupRequest {


    private String name;


    private String email;


    private String password;

}