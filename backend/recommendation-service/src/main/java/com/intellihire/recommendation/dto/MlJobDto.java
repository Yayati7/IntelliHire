package com.intellihire.recommendation.dto;


import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MlJobDto {


    private Long id;


    private String title;


    private String description;


    private String skills;

    private String company;

    private String location;




}