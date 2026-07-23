package com.intellihire.application.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyRequestDto {

    @NotNull(message="User Id required")
    private Long userId;

    @NotNull(message="Job Id required")
    private Long jobId;

}