package com.intellihire.user.controller;

import com.intellihire.user.dto.UserRequestDto;
import com.intellihire.user.entity.UserProfile;
import com.intellihire.user.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @PostMapping
    public UserProfile createUser(
            @RequestBody UserRequestDto dto
    ){

        return userService.createUser(dto);
    }

    @GetMapping
    public List<UserProfile> getUsers(){

        return userService.getAllUsers();
    }
}