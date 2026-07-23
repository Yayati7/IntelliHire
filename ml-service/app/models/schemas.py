from pydantic import BaseModel
from typing import List, Optional

from app.models.debug_models import PipelineDebugInfo


class JobData(BaseModel):

    id: int
    title: str

    company: str
    location: str

    description: str
    skills: str


class RecommendationRequest(BaseModel):

    resume_text: str
    jobs: List[JobData]


class RecommendationResponse(BaseModel):

    jobId: int
    title: str

    semanticScore: float
    skillScore: float
    mlScore: float

    finalScore: float

    matchedSkills: List[str]
    missingSkills: List[str]

    explanation: str

    company: str
    location: str
    description: str

