from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():

    return {
        "status":"ML Service Running"
    }

@app.get("/parse-resume")
def parse_resume():

    return {
        "skills":[
            "Java",
            "Spring Boot",
            "Docker"
        ]
    }