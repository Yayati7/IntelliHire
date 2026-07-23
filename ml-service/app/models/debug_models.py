from pydantic import BaseModel

from typing import List


class EmbeddingPreview(BaseModel):

    dimension: int

    firstTenValues: List[float]


class ScoreBreakdown(BaseModel):

    semanticScore: float

    skillScore: float

    mlScore: float

    semanticWeight: float

    skillWeight: float

    mlWeight: float

    finalHybridScore: float


class JobDebugInfo(BaseModel):

    jobId: int

    jobTitle: str

    jobDescription: str

    jobSkills: str

    cleanedJobText: str

    extractedJobSkills: List[str]

    matchedSkills: List[str]

    missingSkills: List[str]

    semanticSimilarity: float

    skillMatchScore: float

    mlPredictionScore: float

    scoreBreakdown: ScoreBreakdown

    explanation: str

    resumeEmbedding: EmbeddingPreview

    jobEmbedding: EmbeddingPreview


class PipelineDebugInfo(BaseModel):

    modelName: str

    embeddingDimension: int

    originalResume: str

    cleanedResume: str

    extractedResumeSkills: List[str]

    resumeSkillCount: int

    totalJobsEvaluated: int

    evaluatedJobs: List[JobDebugInfo]