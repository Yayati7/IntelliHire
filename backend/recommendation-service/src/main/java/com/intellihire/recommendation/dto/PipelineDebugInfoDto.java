package com.intellihire.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PipelineDebugInfoDto {

    private String modelName;

    private Integer embeddingDimension;

    private String originalResume;

    private String cleanedResume;

    private List<String> extractedResumeSkills;

    private Integer resumeSkillCount;

    private Integer totalJobsEvaluated;

    private List<JobDebugInfoDto> evaluatedJobs;

}