from sklearn.metrics.pairwise import cosine_similarity

from app.services.embedding_service import create_embedding


def calculate_semantic_similarity(

        resume,

        job

):

    resume_embedding = create_embedding(resume)

    job_embedding = create_embedding(job)

    score = cosine_similarity(

        [resume_embedding["vector"]],

        [job_embedding["vector"]]

    )[0][0]

    return {

        "semanticScore": round(score * 100, 2),

        "resumeEmbedding": resume_embedding,

        "jobEmbedding": job_embedding
    }