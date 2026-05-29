package com.intellihire.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    private String name;

    private String email;

    private String location;

    private String summary;
}