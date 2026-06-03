package com.intellihire.user.controller;

import com.intellihire.user.entity.Resume;
import com.intellihire.user.repository.ResumeRepository;
import com.intellihire.user.service.ResumeService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService resumeService;

    private final ResumeRepository resumeRepository;

    public ResumeController(
            ResumeService resumeService,
            ResumeRepository resumeRepository
    ) {
        this.resumeService =
                resumeService;

        this.resumeRepository =
                resumeRepository;
    }

    @PostMapping("/upload")
    public Resume upload(

            @RequestParam Long userId,

            @RequestParam MultipartFile file

    ) throws Exception {

        return resumeService
                .uploadResume(
                        userId,
                        file
                );
    }

    @GetMapping("/{id}")
    public Resume getResume(

            @PathVariable Long id

    ) {

        return resumeRepository
                .findById(id)
                .orElseThrow();
    }

    @GetMapping("/user/{userId}")
    public Resume getResumeByUserId(

            @PathVariable Long userId

    ){

        return resumeService
                .getResumeByUserId(
                        userId
                );
    }
}