package com.intellihire.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractTextResponse {

    private String text;

    private Integer characters;

    private Integer pages;

}