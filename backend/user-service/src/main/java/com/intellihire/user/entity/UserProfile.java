package com.intellihire.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="users")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    private Long id;

    private String name;

    private String email;

    private String location;

    private String summary;
}