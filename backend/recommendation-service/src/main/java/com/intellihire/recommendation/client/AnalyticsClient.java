package com.intellihire.recommendation.client;


import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.*;

import java.util.Map;


@FeignClient(
        name="ANALYTICS-SERVICE"
)
public interface AnalyticsClient {


    @PostMapping("/analytics")
    void saveEvent(

            @RequestBody Map<String,String> body

    );

}