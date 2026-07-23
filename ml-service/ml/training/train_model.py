import pandas as pd


import joblib


from sklearn.feature_extraction.text import TfidfVectorizer


from sklearn.linear_model import LogisticRegression


from sklearn.pipeline import Pipeline


import os




BASE_DIR = os.path.dirname(

    os.path.dirname(__file__)

)



dataset_path = (

        BASE_DIR +

        "/dataset/jobs_dataset.csv"

)



data = pd.read_csv(

    dataset_path

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



X = data["combined"]


y = data["label"]



model = Pipeline(

    [


        (

            "tfidf",

            TfidfVectorizer()

        ),


        (

            "classifier",

            LogisticRegression()

        )

    ]

)



model.fit(

    X,

    y

)



save_path = (

        BASE_DIR

        +

        "/saved_models/job_model.pkl"

)



joblib.dump(

    model,

    save_path

)



print(

    "Model trained and saved"

)