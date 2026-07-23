package com.intellihire.recommendation.controller;

import com.intellihire.recommendation.dto.history.*;

import com.intellihire.recommendation.service.RecommendationHistoryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping(

        "/recommendation/history"

)

public class RecommendationHistoryController {

    private final RecommendationHistoryService service;

    public RecommendationHistoryController(

            RecommendationHistoryService service

    ){

        this.service = service;

    }

    @GetMapping(

            "/{userId}"

    )

    public List<RecommendationHistorySummaryDto>

    latest(

            @PathVariable Long userId

    ){

        return service.getLatestHistory(

                userId

        );

    }

    @GetMapping(

            "/details/{historyId}"

    )

    public RecommendationHistoryDetailsDto

    details(

            @PathVariable Long historyId

    ){

        return service.getHistory(

                historyId

        );

    }

}