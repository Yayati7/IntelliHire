package com.intellihire.analytics.service;


import com.intellihire.analytics.dto.EventRequest;

import com.intellihire.analytics.entity.AnalyticsEvent;

import com.intellihire.analytics.repository.AnalyticsRepository;


import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

import java.util.List;


@Service
public class AnalyticsService {


    private final AnalyticsRepository repository;


    public AnalyticsService(

            AnalyticsRepository repository

    ){

        this.repository = repository;
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


        return repository.save(event);

    }



    public List<AnalyticsEvent> all(){

        return repository.findAll();

    }

}