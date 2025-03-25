from fastapi import FastAPI, File, UploadFile
import pytesseract
from PIL import Image
import io

app = FastAPI()

@app.post("/verify")
async def verify_proof(file: UploadFile = File(...)):
    try:
        # Read image file
        image = Image.open(io.BytesIO(await file.read()))

        # Extract text using OCR
        extracted_text = pytesseract.image_to_string(image)

        # Simple verification logic
        if "Government" in extracted_text or "Certificate" in extracted_text:
            return {"message": "Verification Successful. Your application is approved!"}
        else:
            return {"message": "Verification Failed. Proof is invalid."}

    except Exception as e:
        return {"message": "Error processing image"}
