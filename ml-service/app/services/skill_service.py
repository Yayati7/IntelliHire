import spacy


nlp = spacy.load(
    "en_core_web_sm"
)


DEFAULT_SKILLS = [

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

    "fastapi",

    "microservices"

]


def extract_skills(
        text,
        skills_list=DEFAULT_SKILLS
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



def calculate_skill_score(

        resume,

        job

):


    resume_skills = set(

        extract_skills(resume)

    )


    job_skills = set(

        extract_skills(job)

    )


    if len(job_skills) == 0:


        return 0


    matched = (

            resume_skills

            &

            job_skills

    )


    score = (

                    len(matched)

                    /

                    len(job_skills)

            ) * 100


    return round(

        score,

        2

    )