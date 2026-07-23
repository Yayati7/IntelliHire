package com.intellihire.job.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDto {

    @NotBlank(message="Job title required")
    private String title;

    @NotBlank(message="Company required")
    private String company;

    @NotBlank(message="Location required")
    private String location;

    @NotBlank(message="Description required")
    @Size(min=20,max=5000)
    private String description;

    @NotBlank(message="Skills required")
    private String skills;

    @NotNull(message="Recruiter Id required")
    private Long recruiterId;

}