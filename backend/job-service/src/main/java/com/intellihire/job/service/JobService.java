package com.intellihire.job.service;

import com.intellihire.job.dto.JobRequestDto;
import com.intellihire.job.entity.Job;
import com.intellihire.job.repository.JobRepository;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
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
                .recruiterId(dto.getRecruiterId())

                .build();

        Job saved = jobRepository.save(job);


        log.info(

                "ACTION={} service={} user={} details={}",


                "JOB_CREATED",

                "JOB-SERVICE",

                "RECRUITER",

                "Created job id="+saved.getId()


        );


        return saved;
    }

    public List<Job> getAllJobs(){

        List<Job> jobs =
                jobRepository.findAll();

        log.info(
                "ACTION={} service={} user={} details={}",
                "JOBS_FETCHED",
                "JOB-SERVICE",
                "SYSTEM",
                "Fetched all available jobs"
        );

        return jobs;

    }


    public Job getJobById(
            Long id
    ){

        Job job =
                jobRepository
                        .findById(id)
                        .orElseThrow();

        log.info(
                "ACTION={} service={} user={} details={}",
                "JOB_VIEWED",
                "JOB-SERVICE",
                "USER",
                "Viewed job id=" + id
        );

        return job;

    }


    public List<Job> searchJobs(

            String title,

            String location,

            String skills

    ){

        List<Job> jobs =

                jobRepository

                        .findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCaseAndSkillsContainingIgnoreCase(

                                title,

                                location,

                                skills

                        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "JOB_SEARCH",

                "JOB-SERVICE",

                "USER",

                "title="+title+

                        ", location="+location+

                        ", skills="+skills+

                        ", results="+jobs.size()

        );

        return jobs;

    }

    public void deleteJob(

            Long id

    ){

        Job job =

                jobRepository

                        .findById(id)

                        .orElseThrow();

        jobRepository.delete(job);

        log.info(

                "ACTION={} recruiter={} job={}",

                "JOB_DELETED",

                job.getRecruiterId(),

                job.getId()

        );

    }

    public List<Job> getRecruiterJobs(

            Long recruiterId

    ){

        return jobRepository.findByRecruiterId(

                recruiterId

        );

    }

    public Job update(

            Long id,

            JobRequestDto dto

    ){

        Job job=

                jobRepository.findById(id)

                        .orElseThrow();

        job.setTitle(dto.getTitle());

        job.setLocation(dto.getLocation());

        job.setDescription(dto.getDescription());

        job.setSkills(dto.getSkills());

        log.info(

                "ACTION={} recruiter={} job={}",

                "JOB_UPDATED",

                job.getRecruiterId(),

                job.getId()

        );

        return jobRepository.save(job);

    }

    public Map<String, Long> getJobCount(){

        return Map.of(

                "count",

                jobRepository.count()

        );

    }
}