package com.intellihire.recommendation.controller;

import com.intellihire.recommendation.dto.JobDto;

import com.intellihire.recommendation.dto.RecommendationResponse;
import com.intellihire.recommendation.service.RecommendationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController

@RequestMapping("/recommendation")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(
            RecommendationService service
    ) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public List<RecommendationResponse> recommend(

            @PathVariable Long userId

    ){

        return service
                .recommendJobs(userId);
    }
}