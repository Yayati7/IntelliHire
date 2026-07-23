package com.intellihire.application.client;

import com.intellihire.application.dto.ResumeDto;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(

        name="user",
        contextId = "resumeClient",
        url="http://localhost:8082"

)

public interface ResumeClient {

    @GetMapping(

            "/resume/user/{userId}"

    )

    ResumeDto getResume(

            @PathVariable Long userId

    );

}