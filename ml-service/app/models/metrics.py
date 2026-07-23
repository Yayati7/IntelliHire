from pydantic import BaseModel


class ResearchMetrics(BaseModel):

    transformerModel: str

    embeddingDimension: int

    totalJobsEvaluated: int

    resumeSkillCount: int

    totalMatchedSkills: int

    totalMissingSkills: int

    averageSemanticScore: float

    highestScore: float

    lowestScore: float