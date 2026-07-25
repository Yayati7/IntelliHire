package com.intellihire.user.controller;

import com.intellihire.user.dto.UpdateUserDto;
import com.intellihire.user.dto.UserRequestDto;
import com.intellihire.user.entity.UserProfile;
import com.intellihire.user.service.UserService;
import jakarta.validation.Valid;
import java.util.Map;

import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public List<UserProfile> getUsers(){

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable Long id
    ){

        try {
            return ResponseEntity.ok(
                    userService.getUserById(id)
            );
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public UserProfile createOrUpdateUser(

            @PathVariable Long id,

            @Valid
            @RequestBody UserRequestDto dto
    ){

        return userService.createOrUpdateUser(id, dto);
    }

    @GetMapping("/count")
    public Map<String, Long> getUserCount(){

        return userService.getUserCount();

    }
}