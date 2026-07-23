package com.intellihire.auth.service;


import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.stereotype.Service;


import java.time.Duration;



@Service
public class BlacklistService {


    private final RedisTemplate

            <String,String> redis;



    public BlacklistService(

            RedisTemplate<String,String> redis

    ){

        this.redis=redis;

    }



    public void blacklist(

            String token

    ){


        redis.opsForValue()

                .set(

                        token,

                        "BLOCKED",

                        Duration.ofMinutes(15)

                );

    }


    public boolean blocked(

            String token

    ){


        return Boolean.TRUE.equals(

                redis.hasKey(token)

        );

    }


}