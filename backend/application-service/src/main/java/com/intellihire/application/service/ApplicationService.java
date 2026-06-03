package com.intellihire.application.service;

import com.intellihire.application.dto.ApplyRequestDto;
import com.intellihire.application.entity.Application;
import com.intellihire.application.repository.ApplicationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    public ApplicationService(
            ApplicationRepository repository
    ) {
        this.repository = repository;
    }

    public Application apply(

            ApplyRequestDto dto

    ){

        Application application =
                Application.builder()

                        .userId(dto.getUserId())
                        .jobId(dto.getJobId())
                        .status("APPLIED")

                        .build();

        return repository.save(
                application
        );
    }

    public List<Application> getAll(){

        return repository.findAll();
    }
}