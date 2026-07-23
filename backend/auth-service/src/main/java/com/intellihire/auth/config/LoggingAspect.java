package com.intellihire.auth.config;


import lombok.extern.slf4j.Slf4j;


import org.aspectj.lang.ProceedingJoinPoint;

import org.aspectj.lang.annotation.*;

import org.springframework.stereotype.Component;



@Slf4j

@Aspect

@Component
public class LoggingAspect {


    @Around(

            "execution(* com.intellihire..*(..))"

    )

    public Object logMethods(

            ProceedingJoinPoint joinPoint

    )throws Throwable{


        String method =

                joinPoint

                        .getSignature()

                        .toShortString();



        Object[] args =

                joinPoint.getArgs();



        long start =

                System.currentTimeMillis();



        log.debug(

                "METHOD_ENTRY method={} parameters={}",

                method,

                args

        );



        try{


            Object result =

                    joinPoint.proceed();



            long time =

                    System.currentTimeMillis()

                            -

                            start;



            log.debug(

                    "METHOD_EXIT method={} response={} executionTime={}ms",

                    method,

                    result,

                    time

            );



            return result;


        }

        catch(Exception e){



            log.error(

                    "METHOD_EXCEPTION method={} params={} error={}",

                    method,

                    args,

                    e.getMessage(),

                    e

            );



            throw e;


        }

    }

}