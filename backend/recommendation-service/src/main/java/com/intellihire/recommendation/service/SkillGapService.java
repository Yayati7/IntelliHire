package com.intellihire.recommendation.service;


import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class SkillGapService {


    public List<String> findMissingSkills(

            List<String> resumeSkills,

            List<String> jobSkills

    ){


        List<String> missing =
                new ArrayList<>();


        for(String skill : jobSkills){


            if(
                    !resumeSkills
                            .contains(skill)
            ){

                missing.add(skill);

            }
        }


        return missing;
    }

}