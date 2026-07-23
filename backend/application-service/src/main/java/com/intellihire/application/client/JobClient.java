package com.intellihire.application.client;

import com.intellihire.application.dto.JobDto;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "job",
        url = "http://localhost:8083"
)
public interface JobClient {

    @GetMapping("/job/{id}")
    JobDto getJob(
            @PathVariable Long id
    );

}