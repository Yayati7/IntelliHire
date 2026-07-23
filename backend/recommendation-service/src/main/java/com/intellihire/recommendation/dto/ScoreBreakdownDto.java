package com.intellihire.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreBreakdownDto {

    private Double semanticScore;

    private Double skillScore;

    private Double mlScore;

    private Double semanticWeight;

    private Double skillWeight;

    private Double mlWeight;

    private Double finalHybridScore;

}