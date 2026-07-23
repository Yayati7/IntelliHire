package com.intellihire.recommendation.dto.history;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationHistorySummaryDto {

    private Long historyId;

    private LocalDateTime generatedAt;

    private Double averageScore;

    private Integer totalJobsEvaluated;

}