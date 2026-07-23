package com.intellihire.application.service;

import com.intellihire.application.client.ResumeClient;
import com.intellihire.application.dto.ApplyRequestDto;
import com.intellihire.application.entity.Application;
import com.intellihire.application.repository.ApplicationRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Map;

import java.util.List;
import com.intellihire.application.client.JobClient;
import com.intellihire.application.client.UserClient;

import com.intellihire.application.dto.UserDto;
import com.intellihire.application.dto.JobDto;
import com.intellihire.application.dto.ApplicantDto;
import com.intellihire.application.dto.ResumeDto;
import com.intellihire.application.dto.ApplicationDetailsDto;

@Slf4j
@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    private final UserClient userClient;

    private final JobClient jobClient;

    private final EmailService emailService;

    private final ResumeClient resumeClient;

    public ApplicationService(

            ApplicationRepository repository,

            UserClient userClient,

            JobClient jobClient,

            EmailService emailService, ResumeClient resumeClient

    ) {

        this.repository = repository;

        this.userClient = userClient;

        this.jobClient = jobClient;

        this.emailService= emailService;

        this.resumeClient = resumeClient;
    }

    public Application apply(

            ApplyRequestDto dto

    ){

        if(

                repository.existsByUserIdAndJobId(

                        dto.getUserId(),

                        dto.getJobId()

                )

        ){

            throw new RuntimeException(

                    "You have already applied for this job."

            );

        }

        Application application =

                Application.builder()

                        .userId(

                                dto.getUserId()

                        )

                        .jobId(

                                dto.getJobId()

                        )

                        .status(

                                "APPLIED"

                        )

                        .build();

        Application saved =

                repository.save(

                        application

                );

        log.info(

                "ACTION={} service={} user={} details={}",

                "JOB_APPLICATION_CREATED",

                "APPLICATION-SERVICE",

                saved.getUserId(),

                "Applied for job id="+saved.getJobId()

        );

        return saved;

    }

    public List<Application> getAll(){

        List<Application> list =

                repository.findAll();

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATIONS_FETCHED",

                "APPLICATION-SERVICE",

                "SYSTEM",

                "Fetched all applications"

        );

        return list;

    }

    public List<Application> getUserApplications(

            Long userId

    ){

        List<Application> list =

                repository.findByUserId(

                        userId

                );

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATIONS_FETCHED_BY_USER",

                "APPLICATION-SERVICE",

                userId,

                "Fetched "+list.size()+" applications"

        );

        return list;

    }

    public List<ApplicationDetailsDto>

    getUserApplicationDetails(

            Long userId

    ){

        List<Application> applications =

                repository.findByUserId(

                        userId

                );

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATION_DETAILS_FETCHED",

                "APPLICATION-SERVICE",

                userId,

                "Fetched detailed applications"

        );

        return applications

                .stream()

                .map(app -> {

                    JobDto job =

                            jobClient.getJob(

                                    app.getJobId()

                            );

                    return ApplicationDetailsDto

                            .builder()

                            .applicationId(

                                    app.getId()

                            )

                            .jobId(

                                    app.getJobId()

                            )

                            .title(

                                    job.getTitle()

                            )

                            .company(

                                    job.getCompany()

                            )

                            .location(

                                    job.getLocation()

                            )

                            .status(

                                    app.getStatus()

                            )

                            .build();

                })

                .toList();

    }

    public List<Application> getJobApplications(

            Long jobId

    ){

        List<Application> list =

                repository.findByJobId(

                        jobId

                );

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATIONS_FETCHED_BY_JOB",

                "APPLICATION-SERVICE",

                "RECRUITER",

                "Fetched applications for job "+jobId

        );

        return list;

    }

    public Application approve(

            Long applicationId

    ){

        Application application =

                repository.findById(

                        applicationId

                ).orElseThrow();

        application.setStatus(

                "NEXT_ROUND"

        );

        Application updated =

                repository.save(

                        application

                );

        UserDto user =

                userClient.getUser(

                        application.getUserId()

                );

        JobDto job =

                jobClient.getJob(

                        application.getJobId()

                );

        emailService.send(

                user.getEmail(),

                "Congratulations!",

                """
                Dear %s,
        
                Congratulations!
        
                You have been shortlisted for the next round for
        
                %s
        
                Further interview details will be shared shortly.
        
                Regards,
        
                %s
                """

                        .formatted(

                                user.getName(),

                                job.getTitle(),

                                job.getCompany()

                        )

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATION_APPROVED",

                "APPLICATION-SERVICE",

                updated.getUserId(),

                "Approved for next round"

        );

        return updated;

    }

    public Application reject(

            Long applicationId

    ){

        Application application =

                repository.findById(

                        applicationId

                ).orElseThrow();

        application.setStatus(

                "REJECTED"

        );

        Application updated =

                repository.save(

                        application

                );

        UserDto user =

                userClient.getUser(

                        application.getUserId()

                );

        JobDto job =

                jobClient.getJob(

                        application.getJobId()

                );

        emailService.send(

                user.getEmail(),

                "Application Update",

                """
                Dear %s,
        
                Thank you for applying.
        
                Unfortunately,
        
                you were not selected this time.
        
                We wish you all the best.
        
                Regards,
        
                %s
                """

                        .formatted(

                                user.getName(),

                                job.getCompany()

                        )

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "APPLICATION_REJECTED",

                "APPLICATION-SERVICE",

                updated.getUserId(),

                "Rejected"

        );

        return updated;

    }

    public List<ApplicantDto>

    getApplicants(

            Long jobId

    ){

        List<Application> applications=

                repository.findByJobId(jobId);

        return applications

                .stream()

                .map(app->{

                    UserDto user=

                            userClient.getUser(

                                    app.getUserId()

                            );

                    ResumeDto resume=

                            resumeClient.getResume(

                                    app.getUserId()

                            );

                    return ApplicantDto

                            .builder()

                            .applicationId(

                                    app.getId()

                            )

                            .userId(

                                    app.getUserId()

                            )

                            .candidateName(

                                    user.getName()

                            )

                            .email(

                                    user.getEmail()

                            )

                            .resumeFileName(

                                    resume.getFileName()

                            )

                            .status(

                                    app.getStatus()

                            )

                            .build();

                })

                .toList();

    }

    public Map<String, Long> getApplicationCount(){

        return Map.of(

                "count",

                repository.count()

        );

    }

}