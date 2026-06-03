package com.intellihire.recommendation.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long jobId;

    private String title;

    private String company;

    private int matchPercentage;

    private String explanation;

    private List<String> missingSkills;
}