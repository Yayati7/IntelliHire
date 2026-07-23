import re


def clean_text(text: str):

    original = text

    cleaned = text.lower()

    cleaned = re.sub(

        r"[^a-zA-Z0-9 ]",

        " ",

        cleaned

    )

    cleaned = re.sub(

        r"\s+",

        " ",

        cleaned

    ).strip()

    return {

        "original": original,

        "cleaned": cleaned

    }