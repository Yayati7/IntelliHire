from app.services.pdf.pdf_parser import extract_text_from_pdf


result = extract_text_from_pdf(

    "uploads/Yayati resume.pdf"

)

print(

    result.characters

)

print(

    result.pages

)

print(

    result.text

)