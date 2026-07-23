package com.intellihire.user.client;

import com.intellihire.user.dto.ExtractTextRequest;
import com.intellihire.user.dto.ExtractTextResponse;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(

        name = "ml",

        url = "http://localhost:9000"

)

public interface MlClient {

    @PostMapping(

            "/extract-text"

    )

    ExtractTextResponse extract(

            @RequestBody
            ExtractTextRequest request

    );

}