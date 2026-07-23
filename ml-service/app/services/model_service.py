import joblib

MODEL_PATH = "ml/saved_models/job_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_match(text):

    probability = model.predict_proba([text])[0][1]

    prediction = model.predict([text])[0]

    return {

        "predictionScore": round(probability * 100, 2),

        "predictionClass": int(prediction)
    }