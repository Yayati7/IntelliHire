package com.intellihire.job.repository;

import com.intellihire.job.entity.Job;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository
        extends JpaRepository<Job,Long> {
    List<Job> findByLocation(
            String location
    );

}