from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import json
from urllib.parse import quote_plus

app = Flask(__name__)

# Configure MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['MichiganTeachers']
collection = db['Michiganteachers']

# Post form data into DB
@app.route('/submit', methods=['POST'])
def submit_form():
    form_data = request.get_json()

    # Insert the form data into MongoDB
    collection.insert_one(form_data)

    # Return a response
    response = {'message': 'Form data submitted successfully!'}
    return jsonify(response)
    

'''teach_info = {'degree':'BA',
        'fte':'Full Time'}
teacher_id = collection.insert_one(teach_info).inserted_id
print(teacher_id)
data = collection.find({})

for d in data:
    print(d)'''

if __name__ == '__main__':
    app.run() 
