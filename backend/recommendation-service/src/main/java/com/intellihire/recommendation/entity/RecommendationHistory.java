package com.intellihire.recommendation.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="recommendation_history")

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long resumeId;

    private String modelName;

    private Integer totalJobsEvaluated;

    private Double averageScore;

    private LocalDateTime generatedAt;

    @PrePersist
    public void onCreate(){

        generatedAt = LocalDateTime.now();

    }

}