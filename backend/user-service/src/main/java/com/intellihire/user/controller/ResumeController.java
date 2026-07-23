package com.intellihire.user.controller;

import com.intellihire.user.entity.Resume;
import com.intellihire.user.repository.ResumeRepository;
import com.intellihire.user.service.ResumeService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.constraints.NotNull;

import java.nio.file.Path;
import java.nio.file.Paths;

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

            @RequestParam
            @NotNull(message="User Id required")
            Long userId,

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

    @GetMapping("/download/{userId}")
    public ResponseEntity<Resource> download(

            @PathVariable Long userId

    ) throws Exception{

        Resume resume=

                resumeService.getResumeByUserId(userId);

        Path path=

                Paths.get(

                        resume.getFilePath()

                );

        Resource resource=

                new UrlResource(

                        path.toUri()

                );

        return ResponseEntity.ok()

                .header(

                        HttpHeaders.CONTENT_DISPOSITION,

                        "attachment; filename="+resume.getFileName()

                )

                .body(resource);

    }
}