package com.intellihire.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MlRecommendationResult {

    private List<MlRecommendationResponse> recommendations;

    private ResearchMetricsDto researchMetrics;

    private PipelineDebugInfoDto debugInfo;

}