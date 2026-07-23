package com.intellihire.auth.util;


import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;


import java.security.Key;

import java.util.*;



@Component
public class JwtUtil {



    private final String SECRET =

            "12345678901234567890123456789012";



    private Key key(){

        return Keys.hmacShaKeyFor(

                SECRET.getBytes()

        );

    }



    public String generateAccessToken(

            String email,

            String role

    ){


        return Jwts.builder()


                .subject(email)


                .claim(
                        "role",
                        role
                )


                .issuedAt(new Date())


                .expiration(

                        new Date(

                                System.currentTimeMillis()

                                        + 900000

                        )

                )

                .signWith(key())

                .compact();

    }



    public boolean validate(

            String token

    ){

        try{


            Jwts.parser()

                    .verifyWith(

                            (javax.crypto.SecretKey)

                                    key()

                    )

                    .build()

                    .parseSignedClaims(token);


            return true;


        }catch(Exception e){


            return false;

        }

    }


}