import pandas as pd


import joblib


from sklearn.metrics import (

    accuracy_score,

    precision_score,

    recall_score,

    f1_score

)



data = pd.read_csv(

    "ml/dataset/jobs_dataset.csv"

)



data["combined"] = (

        data["title"]

        +

        " "

        +

        data["description"]

        +

        " "

        +

        data["skills"]

)



model = joblib.load(

    "ml/saved_models/job_model.pkl"

)



prediction = model.predict(

    data["combined"]

)



print(

    "Accuracy:",

    accuracy_score(

        data["label"],

        prediction

    )

)



print(

    "Precision:",

    precision_score(

        data["label"],

        prediction

    )

)



print(

    "Recall:",

    recall_score(

        data["label"],

        prediction

    )

)



print(

    "F1 Score:",

    f1_score(

        data["label"],

        prediction

    )

)