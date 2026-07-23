from app.utils.text_cleaner import clean_text

SKILLS = [
    "java",
    "spring boot",
    "python",
    "docker",
    "kubernetes",
    "react",
    "sql",
    "machine learning",
    "tensorflow",
    "aws",
    "fastapi"
]


def extract_skills(text):

    clean_result = clean_text(text)

    cleaned = clean_result["cleaned"]

    found = []

    for skill in SKILLS:

        if skill in cleaned:

            found.append(skill)

    return {

        "skills": found,

        "count": len(found),

        "cleanedText": cleaned
    }