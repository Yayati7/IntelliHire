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
public class JobDebugInfoDto {

    private Integer jobId;

    private String jobTitle;

    private String jobDescription;

    private String jobSkills;

    private String cleanedJobText;

    private List<String> extractedJobSkills;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private Double semanticSimilarity;

    private Double skillMatchScore;

    private Double mlPredictionScore;

    private ScoreBreakdownDto scoreBreakdown;

    private String explanation;

    private EmbeddingPreviewDto resumeEmbedding;

    private EmbeddingPreviewDto jobEmbedding;

}