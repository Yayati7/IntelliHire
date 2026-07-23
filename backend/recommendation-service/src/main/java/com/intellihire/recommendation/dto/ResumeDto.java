package com.intellihire.recommendation.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDto {

    private Long id;

    private Long userId;

    private String fileName;

    private String filePath;

    private String extractedText;
}