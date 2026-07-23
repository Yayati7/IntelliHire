package com.intellihire.recommendation.repository;

import com.intellihire.recommendation.entity.RecommendationItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecommendationItemRepository
        extends JpaRepository<RecommendationItem, Long> {

    List<RecommendationItem>

    findByHistoryIdOrderByRankNumber(

            Long historyId

    );

    @Transactional
    @Modifying
    void deleteByHistoryId(

            Long historyId

    );

}