package com.intellihire.recommendation.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExplainabilityService {

    public String generateExplanation(

            List<String> matchedSkills,

            int score

    ){

        return

                "Matched Skills: "

                        + matchedSkills +

                        " | Match Score: "

                        + score +

                        "%";
    }
}