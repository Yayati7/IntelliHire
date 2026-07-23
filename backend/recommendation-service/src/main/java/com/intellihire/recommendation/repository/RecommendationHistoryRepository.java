package com.intellihire.recommendation.repository;

import com.intellihire.recommendation.entity.RecommendationHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecommendationHistoryRepository
        extends JpaRepository<RecommendationHistory,Long>{

    List<RecommendationHistory>

    findTop3ByUserIdOrderByGeneratedAtDesc(

            Long userId

    );


    Optional<RecommendationHistory>

    findTopByUserIdOrderByGeneratedAtDesc(

            Long userId

    );


    List<RecommendationHistory>

    findByUserIdOrderByGeneratedAtDesc(

            Long userId

    );
}