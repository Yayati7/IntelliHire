package com.intellihire.auth.service;


import com.intellihire.auth.entity.*;

import com.intellihire.auth.repository.*;


import jakarta.persistence.EntityManager;


import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;

import java.util.UUID;



@Service
public class RefreshTokenService {



    private final RefreshTokenRepository repo;


    private final EntityManager entityManager;



    public RefreshTokenService(

            RefreshTokenRepository repo,

            EntityManager entityManager

    ){

        this.repo = repo;

        this.entityManager = entityManager;

    }





    @Transactional
    public RefreshToken create(

            AuthUser user

    ){



        /*
         delete existing token immediately
         */

        repo.deleteByUser(user);



        /*
         force Hibernate to execute DELETE SQL now
         */

        entityManager.flush();





        RefreshToken token =

                RefreshToken.builder()


                        .user(user)


                        .token(

                                UUID.randomUUID()

                                        .toString()

                        )


                        .expiry(

                                Instant.now()

                                        .plusSeconds(

                                                604800

                                        )

                        )


                        .build();





        return repo.save(token);

    }

}