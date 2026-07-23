package com.intellihire.analytics.client;

import com.intellihire.analytics.dto.CountResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name = "job-service"
)
public interface JobClient {

    @GetMapping("/job/count")
    CountResponse getCount();

}