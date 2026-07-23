package com.intellihire.recommendation.controller;

import com.intellihire.recommendation.dto.MlRecommendationResult;
import com.intellihire.recommendation.service.RecommendationService;

import org.springframework.web.bind.annotation.*;

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
    public MlRecommendationResult recommend(

            @PathVariable Long userId

    ) {

        return service.recommendJobs(

                userId

        );

    }

}