package com.intellihire.application.client;

import com.intellihire.application.dto.UserDto;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "user",
        url = "http://localhost:8082"
)
public interface UserClient {

    @GetMapping("/user/{id}")
    UserDto getUser(
            @PathVariable Long id
    );

}