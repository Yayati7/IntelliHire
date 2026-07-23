package com.intellihire.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractTextRequest {

    private String pdfPath;

}