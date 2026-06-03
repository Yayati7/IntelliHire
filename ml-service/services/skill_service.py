import spacy

nlp = spacy.load(
    "en_core_web_sm"
)

def extract_skills(
        text,
        skills_list
):

    text = text.lower()

    extracted = []

    for skill in skills_list:

        if skill.lower() in text:

            extracted.append(
                skill
            )

    return list(
        set(extracted)
    )