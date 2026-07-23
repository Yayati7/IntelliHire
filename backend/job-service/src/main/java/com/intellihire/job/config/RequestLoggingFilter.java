package com.intellihire.job.config;


import jakarta.servlet.*;

import jakarta.servlet.http.*;


import lombok.extern.slf4j.Slf4j;


import org.springframework.stereotype.Component;


import java.io.IOException;



@Slf4j

@Component

public class RequestLoggingFilter

        implements Filter {



    @Override

    public void doFilter(

            ServletRequest request,

            ServletResponse response,

            FilterChain chain

    )

            throws IOException, ServletException {



        HttpServletRequest req =

                (HttpServletRequest) request;



        HttpServletResponse res =

                (HttpServletResponse) response;



        long start =

                System.currentTimeMillis();



        log.info(

                "HTTP_REQUEST method={} uri={} ip={}",

                req.getMethod(),

                req.getRequestURI(),

                req.getRemoteAddr()

        );



        try{


            chain.doFilter(

                    request,

                    response

            );


        }

        finally{


            long time =

                    System.currentTimeMillis()

                            -

                            start;



            log.info(

                    "HTTP_RESPONSE uri={} status={} time={}ms",

                    req.getRequestURI(),

                    res.getStatus(),

                    time

            );

        }


    }

}