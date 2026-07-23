package com.intellihire.recommendation.service;

import com.intellihire.recommendation.client.AnalyticsClient;
import com.intellihire.recommendation.client.JobClient;
import com.intellihire.recommendation.client.MlClient;
import com.intellihire.recommendation.client.UserClient;

import com.intellihire.recommendation.dto.JobDto;
import com.intellihire.recommendation.dto.ResumeDto;

import com.intellihire.recommendation.dto.MlJobDto;
import com.intellihire.recommendation.dto.MlRecommendationRequest;
import com.intellihire.recommendation.dto.MlRecommendationResult;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class RecommendationService {

    private final UserClient userClient;

    private final JobClient jobClient;

    private final MlClient mlClient;

    private final AnalyticsClient analyticsClient;

    // STEP 2
    private final RecommendationHistoryService historyService;

    public RecommendationService(

            UserClient userClient,

            JobClient jobClient,

            MlClient mlClient,

            AnalyticsClient analyticsClient,

            RecommendationHistoryService historyService

    ) {

        this.userClient =
                userClient;

        this.jobClient =
                jobClient;

        this.mlClient =
                mlClient;

        this.analyticsClient =
                analyticsClient;

        // STEP 2
        this.historyService =
                historyService;

    }

    public MlRecommendationResult recommendJobs(

            Long userId

    ) {

        ResumeDto resume =

                userClient.getResume(

                        userId

                );

        if (

                resume.getExtractedText() == null

                        ||

                        resume.getExtractedText().isBlank()

        ) {

            throw new RuntimeException(

                    "Resume text not available. Please upload resume again."

            );

        }

        List<JobDto> jobs =

                jobClient.getAllJobs();

        List<MlJobDto> mlJobs =

                jobs.stream()

                        .map(

                                job ->

                                        MlJobDto.builder()

                                                .id(

                                                        job.getId()

                                                )

                                                .title(

                                                        job.getTitle()

                                                )

                                                .description(

                                                        job.getDescription()

                                                )

                                                .skills(

                                                        job.getSkills()

                                                )

                                                .company(job.getCompany())
                                                .location(job.getLocation())

                                                .build()

                        )

                        .toList();

        MlRecommendationRequest request =

                MlRecommendationRequest

                        .builder()

                        .resume_text(

                                resume.getExtractedText()

                        )

                        .jobs(

                                mlJobs

                        )

                        .build();

        log.info(

                "ACTION={} service={} user={} details={}",

                "AI_RECOMMENDATION_STARTED",

                "RECOMMENDATION-SERVICE",

                userId,

                "Resume characters="

                        +

                        resume.getExtractedText().length()

        );

        MlRecommendationResult result =

                mlClient.recommend(

                        request

                );

        // STEP 4
        log.info(

                "ACTION={} service={} user={} details={}",

                "TOP5_RECOMMENDATIONS",

                "RECOMMENDATION-SERVICE",

                userId,

                "Saving Top 5 recommendation history"

        );

        // STEP 3
        historyService.saveRecommendationHistory(

                userId,

                resume.getId(),

                "all-MiniLM-L6-v2",

                jobs.size(),

                result.getRecommendations()

        );

        // STEP 4
        log.info(

                "ACTION={} service={} user={} details={}",

                "TOP5_RECOMMENDATIONS_SAVED",

                "RECOMMENDATION-SERVICE",

                userId,

                "History successfully saved"

        );

        analyticsClient.saveEvent(

                Map.of(

                        "eventType",

                        "AI_RECOMMENDATION_GENERATED"

                )

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "AI_RECOMMENDATION_COMPLETED",

                "RECOMMENDATION-SERVICE",

                userId,

                "Recommendations="

                        +

                        result.getRecommendations().size()

        );

        return result;

    }

}