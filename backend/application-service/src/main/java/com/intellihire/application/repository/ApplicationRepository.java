package com.intellihire.application.repository;

import com.intellihire.application.entity.Application;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository
        extends JpaRepository<Application,Long> {

}