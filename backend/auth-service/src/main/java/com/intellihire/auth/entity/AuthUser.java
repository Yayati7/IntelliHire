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


    @Column(nullable = false)
    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

}