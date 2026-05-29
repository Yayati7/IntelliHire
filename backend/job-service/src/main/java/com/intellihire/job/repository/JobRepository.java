package com.intellihire.job.repository;

import com.intellihire.job.entity.Job;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository
        extends JpaRepository<Job,Long> {

}