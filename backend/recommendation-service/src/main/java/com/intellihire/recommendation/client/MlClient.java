package com.intellihire.recommendation.client;

import org.springframework.stereotype.Component;

import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

import org.springframework.core.io.FileSystemResource;

import org.springframework.util.LinkedMultiValueMap;

import java.util.Map;


@Component
public class MlClient {


    private final RestTemplate restTemplate =
            new RestTemplate();


    public Map parseResume(
            String filePath
    ){


        FileSystemResource file =
                new FileSystemResource(
                        filePath
                );


        HttpHeaders headers =
                new HttpHeaders();


        headers.setContentType(
                MediaType.MULTIPART_FORM_DATA
        );


        LinkedMultiValueMap<String,Object> body =
                new LinkedMultiValueMap<>();


        body.add(
                "file",
                file
        );


        HttpEntity<LinkedMultiValueMap<String,Object>> request =
                new HttpEntity<>(
                        body,
                        headers
                );


        Map skills =
                restTemplate.postForObject(

                        "http://localhost:8000/parse-resume",

                        request,

                        Map.class
                );


        return skills;

    }

}