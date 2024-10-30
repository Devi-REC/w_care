from flask import Flask, jsonify, render_template, request
from g4f.client import Client
from googletrans import Translator, LANGUAGES
from g4f.client import Client

client = Client()

app = Flask(__name__)

# Initialize Client
client = Client()

# Function to display supported languages from googletrans
def display_supported_languages():
    print("Supported languages:")
    for code, name in LANGUAGES.items():
        print(f"{code}: {name}")

# Function to handle translation
def main34(fdr):
    translator = Translator()
    display_supported_languages()
    
    # Get user input for translation
    source_text = fdr
    target_lang = "en"
    
    # Perform translation
    translated = translator.translate(source_text, dest=target_lang)
    
    # Display the result
    print(f"Original: {source_text}")
    print(f"Translated: {translated.text}")
    return translated.text

# Helper function to generate options from input data
def generate_options(input_data):
    options_data = []
    for index, text in enumerate(input_data):
        options_data.append({
            'value': f'option{index + 1}',
            'text': text.strip()  # Assuming input_data is a list of strings
        })
    return options_data

# Route for handling the message sent to g4f client and getting response
@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json.get('message', "gc")

    # Sending message to g4f client
    
    response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": message+" in english  only and answer only medical problem if the other than medical say no"}
            ]
        )

    simplified_text = response.choices[0].message.content
    print(simplified_text)
    rows=simplified_text
    return jsonify({'rows': rows})

# Main route for the web page
@app.route('/')
def index():
    return render_template('ede.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)




