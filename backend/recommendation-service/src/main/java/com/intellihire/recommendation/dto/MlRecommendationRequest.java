package com.intellihire.recommendation.dto;


import lombok.*;

import java.util.List;



@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MlRecommendationRequest {



    private String resume_text;



    private List<MlJobDto> jobs;



}