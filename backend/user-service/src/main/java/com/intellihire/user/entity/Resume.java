package com.intellihire.user.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")

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

    @Column(
            columnDefinition = "TEXT"
    )
    private String extractedText;

    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        uploadedAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

}