package com.intellihire.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResearchMetricsDto {

    private String transformerModel;

    private Integer embeddingDimension;

    private Integer totalJobsEvaluated;

    private Integer resumeSkillCount;

    private Integer totalMatchedSkills;

    private Integer totalMissingSkills;

    private Double averageSemanticScore;

    private Double highestScore;

    private Double lowestScore;

}