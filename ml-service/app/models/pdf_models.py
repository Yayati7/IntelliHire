from pydantic import BaseModel


class PdfExtractionResult(

    BaseModel

):

    text:str

    characters:int

    pages:int