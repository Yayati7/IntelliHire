package com.intellihire.analytics.repository;

import com.intellihire.analytics.entity.AnalyticsEvent;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticsRepository
        extends JpaRepository<AnalyticsEvent,Long> {

}