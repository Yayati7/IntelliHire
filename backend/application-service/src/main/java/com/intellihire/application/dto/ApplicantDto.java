package com.intellihire.application.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantDto {

    private Long applicationId;

    private Long userId;

    private String candidateName;

    private String email;

    private String resumeFileName;

    private String status;

}