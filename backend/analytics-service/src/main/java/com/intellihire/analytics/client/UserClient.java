package com.intellihire.analytics.client;

import com.intellihire.analytics.dto.CountResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name = "user-service"
)
public interface UserClient {

    @GetMapping("/user/count")
    CountResponse getCount();

}