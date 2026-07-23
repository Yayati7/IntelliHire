package com.intellihire.recommendation.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name="recommendation_item")

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rankNumber;

    private Long jobId;

    private String title;

    private Double semanticScore;

    private Double skillScore;

    private Double mlScore;

    private Double finalScore;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="history_id")
    private RecommendationHistory history;

}