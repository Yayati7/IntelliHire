package com.intellihire.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDto {

    private Long id;

    private Long userId;

    private String fileName;

    private String filePath;

    private String extractedText;

    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;

}