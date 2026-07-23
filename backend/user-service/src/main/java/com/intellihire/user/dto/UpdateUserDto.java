package com.intellihire.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {

    @NotBlank(message="Name cannot be empty")
    @Size(min=3,max=50)
    private String name;

    @NotBlank(message="Location cannot be empty")
    private String location;

    @NotBlank(message="Summary cannot be empty")
    @Size(max=1000)
    private String summary;

}