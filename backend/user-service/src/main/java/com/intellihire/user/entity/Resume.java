package com.intellihire.user.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name="resumes")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private Long userId;

    private String fileName;

    private String filePath;
}