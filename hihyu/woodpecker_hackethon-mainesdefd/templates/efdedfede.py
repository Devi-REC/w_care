from flask import Flask, jsonify, render_template,request
import mysql.connector
from g4f.client import Client
from googletrans import Translator, LANGUAGES
def fetch_data(dc):
   

    # Execute a query
    cursor.execute(dc)

    # Fetch the column names
    columns = [desc[0] for desc in cursor.description]

    # Fetch all rows from the executed query
    rows = cursor.fetchall()

    
    return columns, rows
def display_supported_languages():
    print("Supported languages:")
    for code, name in LANGUAGES.items():
        print(f"{code}: {name}")

def main34(fdr):
    translator = Translator()
    display_supported_languages()
    
    # Get user input
    source_text = fdr
    target_lang = "en"
    
    # Validate language code
    if target_lang not in LANGUAGES:
        print(f"Language code '{target_lang}' is not supported.")
        return
    
    # Perform translation
    translated = translator.translate(source_text, dest=target_lang)
    
    # Display the result
    print(f"Original: {source_text}")
    print(f"Translated: {translated.text}")
    return translated.text
client = Client()
conn1=mysql.connector.connect(host="localhost",
user="root",
password="king123",
)
cursor = conn1.cursor(buffered=True)
# Connect to MySQL
def ase():
                try:
            # Retrieve database names
                    cursor.execute("SHOW DATABASES")
                    databases = cursor.fetchall()
                    return databases

            # Print database names

                except mysql.connector.Error as err:
                   print("Error:", err)
  
app = Flask(__name__)
def generate_options(input_data):
    options_data = []
    for index, text in enumerate(input_data):
        options_data.append({
            'value': f'option{index + 1}',
            'text': text.strip()  # Assuming input_data is a list of strings
        })
    return options_data
def asw():
                try:
            # Retrieve database names
                    cursor.execute("SHOW TABLES")
                    databases = cursor.fetchall()
                    return databases

            # Print database names

                except mysql.connector.Error as err:
                   print("Error:", err)
  
app = Flask(__name__)
def generate_options(input_data):
    options_data = []
    for index, text in enumerate(input_data):
        options_data.append({
            'value': f'option{index + 1}',
            'text': text.strip()  # Assuming input_data is a list of strings
        })
    return options_data

def generate_options1(input_data):
    options_data = []
    for index, text in enumerate(input_data):
        options_data.append({
            'value': f'option{index + 1}',
            'text': text.strip()  # Assuming input_data is a list of strings
        })
    return options_data
@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json.get('message',"gc")
    message1 = request.json.get('select')
    print(message1,"ujgyuyughyhgygygygyg")
    message=main34(message)
    if message1!=" " or message1!="gc" :
     message=message+" and  tablename is ' "+message1
    else:
        message=message+" and  tablename is ' "+message1

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",

    messages=[{"role": "user", "content": f"give mysql query {message}"}],
    
)
    we=str(response.choices[0].message.content).split("\n")
    print(response.choices[0].message.content)
    a=""
    for i in range(0,len(we)):
         if (we[i]=="```sql"):
              for j in range(i+1,len(we)):
                   if (we[j]!="```"):
                        a+=" "+we[j]
                   else:
                        break
         if(a!=""):
              break
    atyu=a.find(';') 
    a=a[:atyu+1] 
    
    wesd=a
    print(a)
    
    
    try:
      print(a)
      columns, rows = fetch_data(wesd)
      print(columns,rows)
      data = cursor.fetchall()
    except:
         cursor.execute(wesd)
         data="successful"
    conn1.commit()
    print(data)
 
    return jsonify({'columns': columns, 'rows': rows})


@app.route('/')
def index():
    return render_template('ede.html')

@app.route('/get_options', methods=['GET','POST'])
def get_options():
 if(request.method=='POST'):
    selected_value = request.json.get('selectedValue','a')
    # Process the selected_value as needed
    cursor.execute(f"use {selected_value}")
    conn1.commit()
    
    cursor.execute(f"ALTER DATABASE {selected_value} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci; ")
    conn1.commit()
    print(f"use {selected_value}")
    asw12=asw()
    asw12= [item[0] for item in asw12]
    options_data=generate_options1(asw12)
    print(options_data)
    
    return jsonify({'selectedValue': options_data})
 else:
    a=ase()
    a= [item[0] for item in a]
    print(a)
    
    options_data=generate_options(a)
    print(options_data)
    return jsonify(options_data)
aew="cd"

@app.route('/trtt', methods=['GET','POST'])
def get_options34():
 if(request.method=='POST'):
    selected_value = request.json.get('selectedValue','a')
    # Process the selected_value as needed
    
    cursor.execute(f"SHOW COLUMNS  FROM {selected_value};")
    conn1.commit()

    datay=cursor.fetchall()
    datay = [item[0] for item in datay]
    print(datay)
    return jsonify(datay)

if __name__ == '__main__':
    app.run(debug=True)
