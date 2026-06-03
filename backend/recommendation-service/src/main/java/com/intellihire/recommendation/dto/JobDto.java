package com.intellihire.recommendation.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobDto {

    private Long id;

    private String title;

    private String company;

    private String location;

    private String description;

    private String skills;
}