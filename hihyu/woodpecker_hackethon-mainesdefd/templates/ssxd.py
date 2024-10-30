import os
from pdf2image import convert_from_path
import pytesseract
from g4f.client import Client

pdf_path = r"C:\Users\Deepa\Downloads\APznzabTN77sjsLsDfFm1O8xTb6LxvkwFPiFf1-LLTYasVJr8y-9u7boXdgdCFyPxIycuLYHWJU6YulUXMYQ06o6UNKcJNkoaXC1dAHefmA9f8jniiq51ShjXT3jXuLTZJ9tExVui_b3x7Rr5rkRMrOexC13Hbcng8lkoATIgC8MlIDbw9qHe6uiQkoPsHnPU0ucCpLhj85R3_uMHV2OOe.pdf"
import os
import fitz
import pytesseract
from g4f.client import Client

pdf_path = r"C:\Users\Deepa\Downloads\APznzabTN77sjsLsDfFm1O8xTb6LxvkwFPiFf1-LLTYasVJr8y-9u7boXdgdCFyPxIycuLYHWJU6YulUXMYQ06o6UNKcJNkoaXC1dAHefmA9f8jniiq51ShjXT3jXuLTZJ9tExVui_b3x7Rr5rkRMrOexC13Hbcng8lkoATIgC8MlIDbw9qHe6uiQkoPsHnPU0ucCpLhj85R3_uMHV2OOe.pdf"

output_dir = 'output_images'

os.makedirs(output_dir, exist_ok=True)

client = Client()

pdf_document = fitz.open(pdf_path)
notes = []
import pandas as pd

excel_file_path = r"C:\Users\Deepa\OneDrive\Documents\derdeded.xlsx" 
df = pd.read_excel(excel_file_path)

print(df.head())

names = df['Name'].tolist() # First column (index 0)
gpas = df['GPA'].tolist()  # Second column (index 1)



# Print the results
for name, gpa in zip(names, gpas):
    print(f"Name: {name}, GPA: {gpa}")

    # Process pages in pairs
    for i in range(0, len(pdf_document), 8):
        images = []
        
        # Convert the current page and the next page to images
        for j in range(i, min(i + 2, len(pdf_document))):
            page = pdf_document.load_page(j)
            pix = page.get_pixmap()
            image_path = os.path.join(output_dir, f'page_{j + 1}.png')
            pix.save(image_path)
            images.append(image_path)

        # Extract text from the first image using OCR
        extracted_text = pytesseract.image_to_string(images[0])

        # Ask for compression and simplification using g4f client
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"give Adaptive Reading Level: Automatically adjust the difficulty of the reading material based on the student's progress gpa is {gpa} out of 5 and comprehension(question and answer) over time:\n{extracted_text}"+'give question and answer and atlast --imp--((i need questions of above texta and answers))'}
            ]
        )

        simplified_text = response.choices[0].message.content
        notes.append(simplified_text)

    # Write notes to a text file
    with open(name+'.txt', 'w') as notes_file:
        for note in notes:
            notes_file.write(note + "\n\n")  # Add some space between notes

    print("PDF has been converted to images and notes have been written to student_notes.txt.")
