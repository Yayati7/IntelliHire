package com.intellihire.auth.repository;


import com.intellihire.auth.entity.AuthUser;
import com.intellihire.auth.entity.RefreshToken;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;


import java.util.Optional;



public interface RefreshTokenRepository

        extends JpaRepository<RefreshToken,Long>{



    Optional<RefreshToken>

    findByToken(

            String token

    );



    Optional<RefreshToken>

    findByUser(

            AuthUser user

    );




    @Modifying
    @Query(
            "DELETE FROM RefreshToken r WHERE r.user = :user"
    )
    void deleteByUser(

            @Param("user")
            AuthUser user

    );

}