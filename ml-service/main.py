from fastapi import FastAPI, UploadFile

from services.pdf_service import (
    extract_text_from_pdf
)

from services.skill_service import (
    extract_skills
)

import shutil

app = FastAPI()

with open(
        "data/skills.txt",
        "r"
) as f:

    SKILLS = [
        line.strip()
        for line in f
    ]


@app.post("/parse-resume")
async def parse_resume(
        file: UploadFile
):

    path = (
            "uploads/"
            + file.filename
    )

    with open(
            path,
            "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    text = extract_text_from_pdf(
        path
    )

    skills = extract_skills(
        text,
        SKILLS
    )

    return {
        "skills": skills
    }


@app.get("/health")
def health():

    return {
        "status": "UP"
    }