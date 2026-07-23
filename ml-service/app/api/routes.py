from fastapi import APIRouter, Query

from app.models.schemas import RecommendationRequest
from app.models.recommendation_result import RecommendationResult

from app.services.recommendation_service import recommend


router = APIRouter()


@router.post(
    "/recommend",
    response_model=RecommendationResult
)
def recommend_jobs(
        request: RecommendationRequest,
        debug: bool = Query(
            default=False,
            description="Return complete AI pipeline debug information"
        )
):

    return recommend(
        request.resume_text,
        request.jobs,
        debug=True
    )