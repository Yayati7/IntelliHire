from pathlib import Path
import fitz

from app.models.pdf_models import PdfExtractionResult


def extract_text_from_pdf(pdf_path):

    pdf = Path(pdf_path)

    # If Java sends a relative path, convert it to absolute
    if not pdf.is_absolute():
        project_root = Path(__file__).resolve().parents[4]
        pdf = project_root / pdf

    print("=" * 60)
    print("Current Working Directory :", Path.cwd())
    print("Received Path            :", pdf_path)
    print("Resolved Path            :", pdf)
    print("File Exists              :", pdf.exists())
    print("=" * 60)

    if not pdf.exists():
        raise FileNotFoundError(f"PDF not found: {pdf}")

    document = fitz.open(str(pdf))

    pages = []

    for page in document:
        pages.append(page.get_text("text"))

    text = "\n".join(pages)

    result = PdfExtractionResult(
        text=text,
        characters=len(text),
        pages=len(document)
    )

    document.close()

    return result