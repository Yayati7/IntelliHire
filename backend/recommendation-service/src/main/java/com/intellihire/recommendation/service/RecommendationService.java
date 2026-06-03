package com.intellihire.recommendation.service;

import com.intellihire.recommendation.client.JobClient;
import com.intellihire.recommendation.client.UserClient;
import com.intellihire.recommendation.client.MlClient;
import com.intellihire.recommendation.client.AnalyticsClient;

import com.intellihire.recommendation.dto.JobDto;
import com.intellihire.recommendation.dto.ResumeDto;
import com.intellihire.recommendation.dto.RecommendationResponse;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;


@Service
public class RecommendationService {


    private final UserClient userClient;

    private final JobClient jobClient;

    private final MlClient mlClient;

    private final MatchingService matchingService;

    private final ExplainabilityService explainabilityService;

    private final SkillGapService skillGapService;

    private final AnalyticsClient analyticsClient;



    public RecommendationService(

            UserClient userClient,

            JobClient jobClient,

            MlClient mlClient,

            MatchingService matchingService,

            ExplainabilityService explainabilityService,

            SkillGapService skillGapService,

            AnalyticsClient analyticsClient

    ) {

        this.userClient = userClient;

        this.jobClient = jobClient;

        this.mlClient = mlClient;

        this.matchingService = matchingService;

        this.explainabilityService =
                explainabilityService;

        this.skillGapService =
                skillGapService;

        this.analyticsClient =
                analyticsClient;
    }



    public List<RecommendationResponse> recommendJobs(
            Long userId
    ){


        ResumeDto resume =
                userClient.getResume(
                        userId
                );


        Map parsed =
                mlClient.parseResume(
                        resume.getFilePath()
                );


        List<String> resumeSkills =
                (List<String>)
                        parsed.get(
                                "skills"
                        );


        List<JobDto> jobs =
                jobClient.getAllJobs();



        List<RecommendationResponse> recommendations =
                new ArrayList<>();



        for(
                JobDto job : jobs
        ){


            List<String> jobSkills =

                    Arrays.stream(

                                    job.getSkills()
                                            .split(",")

                            )

                            .map(
                                    String::trim
                            )

                            .toList();



            int score =
                    matchingService.calculateMatch(

                            resumeSkills,

                            jobSkills
                    );



            List<String> missingSkills =
                    skillGapService.findMissingSkills(

                            resumeSkills,

                            jobSkills
                    );



            if(
                    score >= 25
            ){


                RecommendationResponse r =

                        RecommendationResponse
                                .builder()

                                .jobId(
                                        job.getId()
                                )

                                .title(
                                        job.getTitle()
                                )

                                .company(
                                        job.getCompany()
                                )

                                .matchPercentage(
                                        score
                                )

                                .explanation(

                                        explainabilityService
                                                .generateExplanation(

                                                        resumeSkills,

                                                        score
                                                )
                                )

                                .missingSkills(

                                        missingSkills
                                )

                                .build();



                recommendations.add(
                        r
                );
            }
        }



        recommendations.sort(

                Comparator.comparing(

                        RecommendationResponse::
                                getMatchPercentage

                ).reversed()
        );



        analyticsClient.saveEvent(

                Map.of(

                        "eventType",

                        "RECOMMENDATION_GENERATED"

                )

        );



        return recommendations;
    }

}