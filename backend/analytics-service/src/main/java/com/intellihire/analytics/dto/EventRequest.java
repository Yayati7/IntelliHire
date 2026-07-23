package com.intellihire.analytics.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {

    @NotBlank(message="Event Type required")
    private String eventType;

    private Long userId;

    private String service;

    private String details;
}