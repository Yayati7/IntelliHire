package com.intellihire.application.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyRequestDto {

    private Long userId;

    private Long jobId;
}