package com.intellihire.user.service;

import com.intellihire.user.entity.Resume;
import com.intellihire.user.repository.ResumeRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(
            ResumeRepository resumeRepository
    ) {
        this.resumeRepository =
                resumeRepository;
    }

    public Resume uploadResume(

            Long userId,

            MultipartFile file

    ) throws Exception {

        String uploadDir =
                "uploads/";

        String filePath =
                uploadDir +
                        file.getOriginalFilename();

        Files.copy(

                file.getInputStream(),

                Paths.get(filePath),

                StandardCopyOption.REPLACE_EXISTING
        );

        Resume resume =
                Resume.builder()

                        .userId(userId)

                        .fileName(
                                file.getOriginalFilename()
                        )

                        .filePath(filePath)

                        .build();

        return resumeRepository.save(
                resume
        );
    }

    public Resume getResumeByUserId(
            Long userId
    ){

        return resumeRepository
                .findByUserId(userId)
                .get(0);

    }
}