package com.intellihire.recommendation.dto.history;

import com.intellihire.recommendation.entity.RecommendationItem;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationHistoryDetailsDto {

    private Long historyId;

    private LocalDateTime generatedAt;

    private Double averageScore;

    private List<RecommendationItem> recommendations;

}