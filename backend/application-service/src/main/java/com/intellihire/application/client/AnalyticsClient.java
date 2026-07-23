package com.intellihire.application.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(
        name = "analytics",
        url = "http://localhost:8086"
)
public interface AnalyticsClient {

    @PostMapping("/analytics")
    void saveEvent(

            @RequestBody Map<String, Object> request

    );

}