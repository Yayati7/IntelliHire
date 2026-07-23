package com.intellihire.auth.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class LoginAttemptService {


    private final RedisTemplate<String,String> redis;


    public LoginAttemptService(

            RedisTemplate<String,String> redis

    ){

        this.redis=redis;

    }


    public boolean allowed(

            String email

    ){

        Long count=

                redis.opsForValue()

                        .increment(email);



        if(count==1)

            redis.expire(

                    email,

                    Duration.ofMinutes(1)

            );



        return count<=5;

    }

}