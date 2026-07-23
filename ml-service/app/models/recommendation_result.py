from pydantic import BaseModel
from typing import List, Optional

from app.models.schemas import RecommendationResponse
from app.models.debug_models import PipelineDebugInfo
from app.models.metrics import ResearchMetrics


class RecommendationResult(BaseModel):

    recommendations: List[RecommendationResponse]

    researchMetrics: ResearchMetrics

    debugInfo: Optional[PipelineDebugInfo] = None