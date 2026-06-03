package com.intellihire.job.service;

import com.intellihire.job.dto.JobRequestDto;
import com.intellihire.job.entity.Job;
import com.intellihire.job.repository.JobRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(
            JobRepository jobRepository
    ) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(
            JobRequestDto dto
    ){

        Job job = Job.builder()

                .title(dto.getTitle())
                .company(dto.getCompany())
                .location(dto.getLocation())
                .description(dto.getDescription())
                .skills(dto.getSkills())

                .build();

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs(){

        return jobRepository.findAll();
    }

    public Job getJobById(
            Long id
    ){

        return jobRepository.findById(id)
                .orElseThrow();
    }

    public List<Job> searchJobs(
            String location
    ){

        return jobRepository
                .findByLocation(location);
    }
}