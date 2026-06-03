package com.intellihire.application.controller;

import com.intellihire.application.dto.ApplyRequestDto;
import com.intellihire.application.entity.Application;
import com.intellihire.application.service.ApplicationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/application")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(
            ApplicationService service
    ) {
        this.service = service;
    }

    @PostMapping("/apply")
    public Application apply(

            @RequestBody ApplyRequestDto dto

    ){

        return service.apply(dto);
    }

    @GetMapping
    public List<Application> getAll(){

        return service.getAll();
    }
}