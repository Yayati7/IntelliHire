package com.intellihire.application.controller;

import com.intellihire.application.dto.ApplicantDto;
import com.intellihire.application.dto.ApplicationDetailsDto;
import com.intellihire.application.dto.ApplyRequestDto;
import com.intellihire.application.entity.Application;
import com.intellihire.application.service.ApplicationService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(
            ApplicationService service
    ) {
        this.service = service;
    }

    @PostMapping("/apply")
    public Application apply(

            @Valid
            @RequestBody ApplyRequestDto dto

    ){

        return service.apply(dto);

    }

    @GetMapping
    public List<Application> getAll(){

        return service.getAll();

    }

    @GetMapping("/user/{userId}")
    public List<Application> getUserApplications(

            @PathVariable Long userId

    ){

        return service.getUserApplications(

                userId

        );

    }

    @GetMapping("/job/{jobId}")
    public List<Application> getJobApplications(

            @PathVariable Long jobId

    ){

        return service.getJobApplications(

                jobId

        );

    }

    @PutMapping("/{id}/approve")
    public Application approve(

            @PathVariable Long id

    ){

        return service.approve(

                id

        );

    }

    @PutMapping("/{id}/reject")
    public Application reject(

            @PathVariable Long id

    ){

        return service.reject(

                id

        );

    }

    @GetMapping("/job/{jobId}/details")
    public List<ApplicantDto>
    details(

            @PathVariable Long jobId

    ){

        return service.getApplicants(jobId);

    }

    @GetMapping("/user/{userId}/details")
    public List<ApplicationDetailsDto> getUserApplicationDetails(
            @PathVariable Long userId
    ){
        return service.getUserApplicationDetails(userId);
    }

    @GetMapping("/count")
    public Map<String, Long> getApplicationCount(){

        return service.getApplicationCount();

    }

}