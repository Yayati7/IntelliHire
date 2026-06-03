package com.intellihire.recommendation.client;

import com.intellihire.recommendation.dto.JobDto;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(
        name = "JOB-SERVICE"
)
public interface JobClient {

    @GetMapping("/job")
    List<JobDto> getAllJobs();
}