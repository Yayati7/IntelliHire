package com.intellihire.job.controller;

import com.intellihire.job.dto.JobRequestDto;
import com.intellihire.job.entity.Job;
import com.intellihire.job.service.JobService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@RequestMapping("/job")
public class JobController {

    private final JobService jobService;

    public JobController(
            JobService jobService
    ) {
        this.jobService = jobService;
    }

    @PostMapping
    public Job createJob(
            @Valid
            @RequestBody JobRequestDto dto
    ){

        return jobService.createJob(dto);
    }

    @GetMapping
    public List<Job> getAllJobs(){

        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Job getJob(
            @PathVariable Long id
    ){

        return jobService.getJobById(id);
    }

    @GetMapping("/search")

    public List<Job> search(

            @RequestParam(

                    defaultValue=""

            )

            String title,

            @RequestParam(

                    defaultValue=""

            )

            String location,

            @RequestParam(

                    defaultValue=""

            )

            String skills

    ){

        return jobService.searchJobs(

                title,

                location,

                skills

        );

    }

    @GetMapping("/recruiter/{recruiterId}")
    public List<Job> recruiterJobs(

            @PathVariable Long recruiterId

    ){

        return jobService.getRecruiterJobs(

                recruiterId

        );

    }

    @DeleteMapping("/{id}")
    public void delete(

            @PathVariable Long id

    ){

        jobService.deleteJob(id);

    }

    @PutMapping("/{id}")
    public Job update(

            @PathVariable Long id,

            @Valid
            @RequestBody JobRequestDto dto

    ){

        return jobService.update(id,dto);

    }

    @GetMapping("/count")
    public Map<String, Long> getJobCount(){

        return jobService.getJobCount();

    }
}