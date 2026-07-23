from app.services.similarity_service import calculate_semantic_similarity
from app.services.skill_service import calculate_skill_score
from app.services.model_service import predict_match
from app.services.nlp_service import extract_skills

from app.models.schemas import RecommendationResponse
from app.models.debug_models import (
    PipelineDebugInfo,
    JobDebugInfo,
    EmbeddingPreview,
    ScoreBreakdown
)
from app.models.metrics import ResearchMetrics
from app.models.recommendation_result import RecommendationResult

from app.services.console_logger import print_pipeline


def recommend(
        resume,
        jobs,
        debug=False
):

    recommendations = []

    debug_jobs = []

    resume_result = extract_skills(resume)

    resume_skills = resume_result["skills"]

    cleaned_resume = resume_result["cleanedText"]

    for job in jobs:

        job_text = (
                job.title + " "
                + job.description + " "
                + job.skills
        )

        job_result = extract_skills(job_text)

        job_skills = job_result["skills"]

        cleaned_job = job_result["cleanedText"]

        semantic = calculate_semantic_similarity(
            resume,
            job_text
        )

        skill_score = calculate_skill_score(
            resume,
            job_text
        )

        prediction = predict_match(
            job_text
        )

        final_score = (
                semantic["semanticScore"] * 0.5
                +
                skill_score * 0.3
                +
                prediction["predictionScore"] * 0.2
        )

        matched = list(
            set(resume_skills)
            &
            set(job_skills)
        )

        missing = list(
            set(job_skills)
            -
            set(resume_skills)
        )

        explanation = (
            f"Matched skills: {matched}. "
            f"Missing skills: {missing}. "
            f"Overall compatibility {round(final_score,2)}%"
        )

        recommendations.append(

            RecommendationResponse(

                jobId=job.id,

                title=job.title,

                company= job.company,
                location= job.location,
                description= job.description,

                semanticScore=semantic["semanticScore"],

                skillScore=skill_score,

                mlScore=prediction["predictionScore"],

                finalScore=round(final_score,2),

                matchedSkills=matched,

                missingSkills=missing,

                explanation=explanation

            )

        )

        debug_jobs.append(

            JobDebugInfo(

                jobId=job.id,

                jobTitle=job.title,

                jobDescription=job.description,

                jobSkills=job.skills,

                cleanedJobText=cleaned_job,

                extractedJobSkills=job_skills,

                matchedSkills=matched,

                missingSkills=missing,

                semanticSimilarity=semantic["semanticScore"],

                skillMatchScore=skill_score,

                mlPredictionScore=prediction["predictionScore"],

                scoreBreakdown=ScoreBreakdown(

                    semanticScore=semantic["semanticScore"],

                    skillScore=skill_score,

                    mlScore=prediction["predictionScore"],

                    semanticWeight=0.5,

                    skillWeight=0.3,

                    mlWeight=0.2,

                    finalHybridScore=round(final_score,2)

                ),

                explanation=explanation,

                resumeEmbedding=EmbeddingPreview(

                    dimension=semantic["resumeEmbedding"]["dimension"],

                    firstTenValues=semantic["resumeEmbedding"]["preview"]

                ),

                jobEmbedding=EmbeddingPreview(

                    dimension=semantic["jobEmbedding"]["dimension"],

                    firstTenValues=semantic["jobEmbedding"]["preview"]

                )

            )

        )

    metrics = ResearchMetrics(

        transformerModel="all-MiniLM-L6-v2",

        embeddingDimension=384,

        totalJobsEvaluated=len(jobs),

        resumeSkillCount=len(resume_skills),

        totalMatchedSkills=sum(
            len(j.matchedSkills)
            for j in debug_jobs
        ),

        totalMissingSkills=sum(
            len(j.missingSkills)
            for j in debug_jobs
        ),

        averageSemanticScore=round(
            sum(
                j.semanticSimilarity
                for j in debug_jobs
            ) / len(debug_jobs),
            2
        ) if debug_jobs else 0,

        highestScore=max(
            j.scoreBreakdown.finalHybridScore
            for j in debug_jobs
        ) if debug_jobs else 0,

        lowestScore=min(
            j.scoreBreakdown.finalHybridScore
            for j in debug_jobs
        ) if debug_jobs else 0

    )

    pipeline = PipelineDebugInfo(

        modelName="all-MiniLM-L6-v2",

        embeddingDimension=384,

        originalResume=resume,

        cleanedResume=cleaned_resume,

        extractedResumeSkills=resume_skills,

        resumeSkillCount=len(resume_skills),

        totalJobsEvaluated=len(jobs),

        evaluatedJobs=debug_jobs

    )

    if debug:

        print_pipeline(pipeline)

        return RecommendationResult(

            recommendations=sorted(

                recommendations,

                key=lambda x: x.finalScore,

                reverse=True

            ),

            researchMetrics=metrics,

            debugInfo=pipeline

        )

    return RecommendationResult(

        recommendations=sorted(

            recommendations,

            key=lambda x: x.finalScore,

            reverse=True

        ),

        researchMetrics=metrics,

        debugInfo=None

    )