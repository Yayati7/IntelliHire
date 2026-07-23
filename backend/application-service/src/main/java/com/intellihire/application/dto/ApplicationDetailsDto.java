package com.intellihire.application.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDetailsDto {

    private Long applicationId;

    private Long jobId;

    private String title;

    private String company;

    private String location;

    private String status;

}
