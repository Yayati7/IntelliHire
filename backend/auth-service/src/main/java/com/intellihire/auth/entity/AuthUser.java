package com.intellihire.auth.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthUser {


    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )

    private Long id;


    private String name;


    @Column(
            unique = true
    )

    private String email;


    private String password;


    private String provider;

}