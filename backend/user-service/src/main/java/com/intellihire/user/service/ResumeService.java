package com.intellihire.user.service;

import com.intellihire.user.client.MlClient;
import com.intellihire.user.dto.ExtractTextRequest;
import com.intellihire.user.dto.ExtractTextResponse;
import com.intellihire.user.entity.Resume;
import com.intellihire.user.repository.ResumeRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    private final MlClient mlClient;

    public ResumeService(

            ResumeRepository resumeRepository,

            MlClient mlClient

    ) {

        this.resumeRepository =
                resumeRepository;

        this.mlClient =
                mlClient;

    }

    @Transactional
    public Resume uploadResume(

            Long userId,

            MultipartFile file

    ) throws Exception {

        Optional<Resume> existingResume =

                resumeRepository.findFirstByUserId(

                        userId

                );

        System.out.println("Existing = " + existingResume);

        log.info(

                "Resume exists = {}",

                existingResume.isPresent()

        );

        existingResume.ifPresent(

                resume -> log.info(

                        "Existing Resume -> id={} userId={} path={}",

                        resume.getId(),

                        resume.getUserId(),

                        resume.getFilePath()

                )

        );

        // FILE TYPE VALIDATION

        if (

                !file.getContentType()

                        .equals(

                                "application/pdf"

                        )

        ) {

            throw new RuntimeException(

                    "Only PDF allowed"

            );

        }

        // FILE SIZE VALIDATION (10 MB)

        if (

                file.getSize()

                        >

                        10 * 1024 * 1024

        ) {

            throw new RuntimeException(

                    "File too large"

            );

        }

        String tempDir =

                "uploads/temp/";

        String encryptedDir =

                "uploads/encrypted/";

        Files.createDirectories(
                Paths.get(
                        tempDir
                )
        );

        Files.createDirectories(
                Paths.get(
                        encryptedDir
                )
        );

        String tempName =

                UUID.randomUUID()

                        +

                        ".pdf";

        String encryptedName =

                UUID.randomUUID()

                        +

                        ".pdf.enc";

        String tempPath =

                tempDir

                        +

                        tempName;

        String encryptedPath =

                encryptedDir

                        +

                        encryptedName;

        if (existingResume.isPresent()) {

            Resume oldResume = existingResume.get();

            log.info(

                    "Deleting old resume id={}",

                    oldResume.getId()

            );

            Files.deleteIfExists(

                    Paths.get(

                            oldResume.getFilePath()

                    )

            );

            resumeRepository.delete(

                    oldResume

            );

            resumeRepository.flush();

            log.info(

                    "ACTION={} service={} user={} details={}",

                    "OLD_RESUME_DELETED",

                    "USER-SERVICE",

                    userId,

                    oldResume.getFileName()

            );

        }

        ExtractTextResponse response;

        try {

            Files.copy(
                    file.getInputStream(),
                    Paths.get(
                            tempPath
                    ),
                    StandardCopyOption.REPLACE_EXISTING
            );

            response=
                    mlClient.extract(

                            ExtractTextRequest
                                    .builder()
                                    .pdfPath(
                                            tempPath
                                    )
                                    .build()

                    );

            Files.move(

                    Paths.get(
                            tempPath
                    ),

                    Paths.get(
                            encryptedPath
                    ),

                    StandardCopyOption.REPLACE_EXISTING

            );

            // Resume creation continues here...

        }
        finally{

            Files.deleteIfExists(

                    Paths.get(

                            tempPath

                    )

            );

        }

        Resume resume =

                Resume.builder()

                        .userId(

                                userId

                        )

                        .fileName(

                                encryptedName

                        )

                        .filePath(

                                encryptedPath

                        )

                        .extractedText(

                                response.getText()

                        )

                        .build();

        Resume saved =

                resumeRepository.save(

                        resume

                );

        log.info(

                "ACTION={} service={} user={} details={}",

                "NEW_RESUME_STORED",

                "USER-SERVICE",

                userId,

                encryptedName

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "RESUME_TEXT_EXTRACTED",

                "USER-SERVICE",

                userId,

                "Characters="

                        +

                        response.getCharacters()

                        +

                        ", Pages="

                        +

                        response.getPages()

                        +
                        ", ExtractedTextLength="
                        +
                        response.getText().length()

        );

        log.info(

                "ACTION={} service={} user={} details={}",

                "RESUME_UPLOAD",

                "USER-SERVICE",

                userId,

                "Resume encrypted and stored successfully"

        );

        return saved;

    }

    public Resume getResumeByUserId(

            Long userId

    ) {

        return resumeRepository

                .findFirstByUserId(

                        userId

                )

                .orElseThrow(

                        () -> new RuntimeException(

                                "Resume not found"

                        )

                );

    }

}