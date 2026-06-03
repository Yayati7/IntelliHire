package com.intellihire.job.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name="jobs")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    private String company;

    private String location;

    @Column(length = 5000)
    private String description;

    private String skills;
}