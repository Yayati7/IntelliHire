package com.intellihire.recommendation.dto;


import lombok.*;

import java.util.List;



@Getter
@Setter
public class MlRecommendationResponse {



    private Long jobId;


    private String title;


    private Double semanticScore;


    private Double skillScore;


    private Double mlScore;


    private Double finalScore;


    private List<String> matchedSkills;


    private List<String> missingSkills;


    private String explanation;

    private String company;
    private String location;
    private String description;


}