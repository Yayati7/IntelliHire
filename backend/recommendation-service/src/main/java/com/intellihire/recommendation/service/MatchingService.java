package com.intellihire.recommendation.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchingService {

    public int calculateMatch(

            List<String> resumeSkills,

            List<String> jobSkills

    ){

        int matches = 0;

        for(String skill : jobSkills){

            if(resumeSkills.contains(skill)){

                matches++;

            }
        }

        return (matches * 100)
                / jobSkills.size();
    }
}