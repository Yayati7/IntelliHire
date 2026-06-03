package com.intellihire.job.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDto {

    private String title;

    private String company;

    private String location;

    private String description;

    private String skills;
}