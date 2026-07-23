package com.intellihire.recommendation.service;

import com.intellihire.recommendation.dto.MlRecommendationResponse;
import com.intellihire.recommendation.dto.history.RecommendationHistoryDetailsDto;
import com.intellihire.recommendation.dto.history.RecommendationHistorySummaryDto;
import com.intellihire.recommendation.entity.RecommendationHistory;
import com.intellihire.recommendation.entity.RecommendationItem;
import com.intellihire.recommendation.repository.RecommendationHistoryRepository;
import com.intellihire.recommendation.repository.RecommendationItemRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RecommendationHistoryService {

    private final RecommendationHistoryRepository historyRepository;

    private final RecommendationItemRepository itemRepository;

    public RecommendationHistoryService(

            RecommendationHistoryRepository historyRepository,

            RecommendationItemRepository itemRepository

    ){

        this.historyRepository = historyRepository;

        this.itemRepository = itemRepository;

    }

    @Transactional
    public void saveRecommendationHistory(

            Long userId,

            Long resumeId,

            String modelName,

            int totalJobs,

            List<MlRecommendationResponse> recommendations

    ){

        if(

                !shouldCreateHistory(

                        userId,

                        resumeId

                )

        ){

            log.info(

                    "ACTION={} service={} user={} details={}",

                    "RECOMMENDATION_HISTORY_SKIPPED",

                    "RECOMMENDATION-SERVICE",

                    userId,

                    "Recommendation already exists for current resume"

            );

            return;

        }

        double average = recommendations.stream()

                .limit(5)

                .mapToDouble(MlRecommendationResponse::getFinalScore)

                .average()

                .orElse(0);

        RecommendationHistory history =

                RecommendationHistory.builder()

                        .userId(userId)

                        .resumeId(resumeId)

                        .modelName(modelName)

                        .totalJobsEvaluated(totalJobs)

                        .averageScore(average)

                        .build();

        history = historyRepository.save(history);

        int rank = 1;

        for(

                MlRecommendationResponse recommendation :

                recommendations.stream().limit(5).toList()

        ){

            log.info(

                    "ACTION={} service={} user={} details={}",

                    "TOP5_RECOMMENDATION",

                    "RECOMMENDATION-SERVICE",

                    userId,

                    "Rank="

                            + rank

                            + ", Title="

                            + recommendation.getTitle()

                            + ", Score="

                            + recommendation.getFinalScore()

            );

            RecommendationItem item =

                    RecommendationItem.builder()

                            .rankNumber(rank++)

                            .jobId(recommendation.getJobId())

                            .title(recommendation.getTitle())

                            .semanticScore(recommendation.getSemanticScore())

                            .skillScore(recommendation.getSkillScore())

                            .mlScore(recommendation.getMlScore())

                            .finalScore(recommendation.getFinalScore())

                            .explanation(recommendation.getExplanation())

                            .history(history)

                            .build();

            itemRepository.save(item);

        }

        // ============================
        // STEP 4
        // Keep only latest 3 sessions
        // ============================

        cleanupHistory(

                userId

        );

        // ============================
        // STEP 5
        // Cleanup Logging
        // ============================

        log.info(

                "ACTION={} service={} user={} details={}",

                "RECOMMENDATION_HISTORY_CLEANUP",

                "RECOMMENDATION-SERVICE",

                userId,

                "Only latest 3 recommendation sessions retained"

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "RECOMMENDATION_HISTORY_CREATED",

                "RECOMMENDATION-SERVICE",

                userId,

                "Saved Top 5 recommendations"

        );

    }

    // ============================
    // STEP 6
    // ============================

    public List<RecommendationHistorySummaryDto> getLatestHistory(

            Long userId

    ){

        return historyRepository

                .findTop3ByUserIdOrderByGeneratedAtDesc(

                        userId

                )

                .stream()

                .map(

                        history ->

                                RecommendationHistorySummaryDto

                                        .builder()

                                        .historyId(

                                                history.getId()

                                        )

                                        .generatedAt(

                                                history.getGeneratedAt()

                                        )

                                        .averageScore(

                                                history.getAverageScore()

                                        )

                                        .totalJobsEvaluated(

                                                history.getTotalJobsEvaluated()

                                        )

                                        .build()

                )

                .toList();

    }

    // ============================
    // STEP 7
    // ============================

    public RecommendationHistoryDetailsDto getHistory(

            Long historyId

    ){

        RecommendationHistory history =

                historyRepository

                        .findById(

                                historyId

                        )

                        .orElseThrow();

        return RecommendationHistoryDetailsDto

                .builder()

                .historyId(

                        history.getId()

                )

                .generatedAt(

                        history.getGeneratedAt()

                )

                .averageScore(

                        history.getAverageScore()

                )

                .recommendations(

                        itemRepository

                                .findByHistoryIdOrderByRankNumber(

                                        historyId

                                )

                )

                .build();

    }

    private boolean shouldCreateHistory(

            Long userId,

            Long resumeId

    ){

        Optional<RecommendationHistory> latest =

                historyRepository

                        .findTopByUserIdOrderByGeneratedAtDesc(

                                userId

                        );

        if(latest.isEmpty()){

            log.info("No previous history found");

            return true;

        }

        RecommendationHistory history = latest.get();

        log.info("Current Resume Id  : {}", resumeId);

        log.info("Previous Resume Id : {}", history.getResumeId());

        log.info("Previous Time      : {}", history.getGeneratedAt());

        log.info("Current Time       : {}", LocalDateTime.now());

        if(

                !history.getResumeId().equals(resumeId)

        ){

            log.info("Resume changed");

            return true;

        }

        Duration duration =

                Duration.between(

                        history.getGeneratedAt(),

                        LocalDateTime.now()

                );

        log.info("Hours Difference = {}", duration.toHours());

        return duration.toHours() >= 24;

    }

    @Transactional
    private void cleanupHistory(

            Long userId

    ){

        List<RecommendationHistory> history =

                historyRepository

                        .findByUserIdOrderByGeneratedAtDesc(

                                userId

                        );

        if(history.size()<=3){

            return;

        }

        for(

                int i=3;

                i<history.size();

                i++

        ){

            RecommendationHistory old =

                    history.get(i);

            itemRepository.deleteByHistoryId(

                    old.getId()

            );

            historyRepository.delete(

                    old

            );

        }

    }

}