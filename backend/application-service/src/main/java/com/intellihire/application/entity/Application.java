package com.intellihire.application.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name="applications")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private Long userId;

    private Long jobId;

    private String status;
}