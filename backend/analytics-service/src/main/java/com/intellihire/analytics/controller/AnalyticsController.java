package com.intellihire.analytics.controller;


import com.intellihire.analytics.dto.EventRequest;

import com.intellihire.analytics.entity.AnalyticsEvent;

import com.intellihire.analytics.service.AnalyticsService;


import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController

@RequestMapping("/analytics")
public class AnalyticsController {


    private final AnalyticsService service;


    public AnalyticsController(
            AnalyticsService service
    ){

        this.service = service;
    }


    @PostMapping
    public AnalyticsEvent save(

            @RequestBody EventRequest request

    ){

        return service.save(request);

    }



    @GetMapping
    public List<AnalyticsEvent> all(){

        return service.all();

    }

}