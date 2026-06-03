package com.intellihire.job.controller;

import com.intellihire.job.dto.JobRequestDto;
import com.intellihire.job.entity.Job;
import com.intellihire.job.service.JobService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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

            @RequestParam String location

    ){

        return jobService
                .searchJobs(location);
    }
}