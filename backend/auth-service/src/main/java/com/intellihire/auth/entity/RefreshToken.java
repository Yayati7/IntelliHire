package com.intellihire.auth.entity;


import jakarta.persistence.*;

import lombok.*;

import java.time.Instant;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {


    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )

    private Long id;



    private String token;



    private Instant expiry;



    @OneToOne

    private AuthUser user;


}