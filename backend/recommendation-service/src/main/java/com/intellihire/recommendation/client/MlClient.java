package com.intellihire.recommendation.client;

import com.intellihire.recommendation.dto.MlRecommendationRequest;
import com.intellihire.recommendation.dto.MlRecommendationResult;

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


    // ==============================
    // Resume Parser ML API
    // ==============================

    public Map parseResume(
            String filePath
    ) {

        FileSystemResource file =
                new FileSystemResource(
                        filePath
                );

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.MULTIPART_FORM_DATA
        );

        LinkedMultiValueMap<String, Object> body =
                new LinkedMultiValueMap<>();

        body.add(
                "file",
                file
        );

        HttpEntity<LinkedMultiValueMap<String, Object>> request =
                new HttpEntity<>(
                        body,
                        headers
                );

        Map skills =
                restTemplate.postForObject(

                        "http://localhost:9000/parse-resume",

                        request,

                        Map.class
                );

        return skills;

    }


    // ==============================
    // Recommendation ML API
    // ==============================

    public MlRecommendationResult recommend(

            MlRecommendationRequest request

    ) {

        return restTemplate.postForObject(

                "http://localhost:9000/recommend",

                request,

                MlRecommendationResult.class

        );

    }

}