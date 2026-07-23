from fastapi import APIRouter

from app.services.pdf.pdf_parser import extract_text_from_pdf

router = APIRouter()


@router.post(

    "/extract-text"

)

def extract(

        request:dict

):

    result = extract_text_from_pdf(

        request["pdfPath"]

    )

    return result