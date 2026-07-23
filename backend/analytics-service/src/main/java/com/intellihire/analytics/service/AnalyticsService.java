package com.intellihire.analytics.service;


import com.intellihire.analytics.client.ApplicationClient;
import com.intellihire.analytics.client.JobClient;
import com.intellihire.analytics.client.UserClient;
import com.intellihire.analytics.dto.DashboardResponse;
import com.intellihire.analytics.dto.EventRequest;

import com.intellihire.analytics.entity.AnalyticsEvent;

import com.intellihire.analytics.repository.AnalyticsRepository;


import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

import java.util.List;



@Slf4j
@Service
public class AnalyticsService {


    private final AnalyticsRepository repository;
    private final UserClient userClient;
    private final JobClient jobClient;
    private final ApplicationClient applicationClient;

    public AnalyticsService(
            AnalyticsRepository repository,
            UserClient userClient,
            JobClient jobClient,
            ApplicationClient applicationClient
    ) {

        this.repository = repository;
        this.userClient = userClient;
        this.jobClient = jobClient;
        this.applicationClient = applicationClient;

    }



    public AnalyticsEvent save(

            EventRequest request

    ){


        AnalyticsEvent event =

                AnalyticsEvent.builder()

                        .eventType(
                                request.getEventType()
                        )

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();



        AnalyticsEvent saved =

                repository.save(event);



        log.info(

                "ACTION={} service={} user={} details={}",


                "ANALYTICS_EVENT_SAVED",


                "ANALYTICS-SERVICE",


                "SYSTEM",


                "Analytics event stored"

        );



        return saved;

    }






    public List<AnalyticsEvent> all(){


        List<AnalyticsEvent> events =

                repository.findAll();




        log.info(

                "ACTION={} service={} user={} details={}",


                "ANALYTICS_EVENTS_FETCHED",


                "ANALYTICS-SERVICE",


                "SYSTEM",


                "Fetched all analytics events"

        );




        return events;

    }

    public DashboardResponse dashboard() {

        return DashboardResponse.builder()

                .totalUsers(

                        userClient.getCount().getCount()

                )

                .totalJobs(

                        jobClient.getCount().getCount()

                )

                .totalApplications(

                        applicationClient.getCount().getCount()

                )

                .totalEvents(

                        repository.count()

                )

                .recommendationEvents(

                        repository.countByEventType(
                                "RECOMMENDATION_GENERATED"
                        )

                )

                .resumeUploads(

                        repository.countByEventType(
                                "RESUME_UPLOAD"
                        )

                )

                .jobApplications(

                        repository.countByEventType(
                                "JOB_APPLICATION_CREATED"
                        )

                )

                .jobPosts(

                        repository.countByEventType(
                                "JOB_CREATED"
                        )

                )

                .build();

    }

}