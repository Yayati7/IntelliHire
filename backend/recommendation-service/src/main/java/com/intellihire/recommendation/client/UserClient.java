package com.intellihire.recommendation.client;

import com.intellihire.recommendation.dto.ResumeDto;
import com.intellihire.recommendation.dto.UserDto;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "USER-SERVICE"
)
public interface UserClient {

    @GetMapping("/user/{id}")
    UserDto getUser(
            @PathVariable Long id
    );

    @GetMapping("/resume/user/{userId}")
    ResumeDto getResume(

            @PathVariable Long userId
    );
}