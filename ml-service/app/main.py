from fastapi import FastAPI

from app.api.routes import router
from app.api import pdf_routes

app = FastAPI(
    title="IntelliHire ML Service"
)

app.include_router(router)

app.include_router(
    pdf_routes.router
)

@app.get("/health")
def health():

    return {
        "status":
            "ML Running"
    }