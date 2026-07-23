package com.intellihire.application.service;

import com.intellihire.application.client.AnalyticsClient;

import lombok.extern.slf4j.Slf4j;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender sender;

    private final AnalyticsClient analyticsClient;

    public EmailService(

            JavaMailSender sender,

            AnalyticsClient analyticsClient

    ){

        this.sender = sender;

        this.analyticsClient = analyticsClient;

    }

    public void send(

            String to,

            String subject,

            String body

    ){

        SimpleMailMessage message =

                new SimpleMailMessage();

        message.setTo(

                to

        );

        message.setSubject(

                subject

        );

        message.setText(

                body

        );

        try{

            sender.send(

                    message

            );

            log.info(

                    "ACTION={} service={} user={} details={}",

                    "EMAIL_SENT",

                    "APPLICATION-SERVICE",

                    to,

                    subject

            );

            analyticsClient.saveEvent(

                    Map.of(

                            "eventType",

                            "EMAIL_SENT"

                    )

            );

        }

        catch(Exception e){

            log.error(

                    "ACTION={} service={} user={} details={}",

                    "EMAIL_FAILED",

                    "APPLICATION-SERVICE",

                    to,

                    e.getMessage(),

                    e

            );

        }

    }

}