from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"

model = SentenceTransformer(MODEL_NAME)


def create_embedding(text):

    embedding = model.encode(text)

    return {

        "vector": embedding,

        "preview": embedding[:10].tolist(),

        "dimension": len(embedding),

        "modelName": MODEL_NAME
    }