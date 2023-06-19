from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
from flask_cors import CORS
import analytics

app = Flask(__name__)
CORS(app)

# Configure MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['MichiganTeachers']
collection = db['Michiganteachers']
collection1 = db['ExcelTeachers']



# Post form data into DB
@app.route("/submit", methods=["POST"])
def submit_form():

    data = request.get_json()

    # Convert relevant fields to integers
    years = int(data['years'])
    baseIncome = float(data['baseIncome'])
    ficaPayment = float(data['ficaPayment'])
    retirementPayment = float(data['retirementPayment'])
    totalSalary = float(data['totalSalary'])

    # Create a document to insert into the collection
    document = {
        'degree': data['degree'],
        'fte': data['fte'],
        'years': years,
        'baseIncome': baseIncome,
        'ficaPayment': ficaPayment,
        'retirementPayment': retirementPayment,
        'totalSalary': totalSalary,
        'feedback': data['feedback']
    }

    # Insert the document into the collection
    collection.insert_one(document)

    # Return a response
    response = {'message': 'Form data submitted successfully!'}
    return jsonify(response)



@app.route("/excel", methods=["POST"])
def submit_excel():
    file = request.files['file']  # Get the uploaded file from the form
    if file and file.filename.endswith('.xlsx'):
        # Read the Excel file into a DataFrame and convert to dictionary
        df = pd.read_excel(file)
        data = df.to_dict(orient='records')
        # Insert the data into MongoDB
        collection1.insert_many(data)
        return 'Data inserted successfully'
    else:
        return 'Invalid file format'
    

@app.route("/data", methods=["GET"])
def get_data():
    data = collection1.find()
    result = []
    for document in data:
        document['_id'] = str(document['_id'])
        result.append(document)

    #print(result)
    return jsonify(result)

@app.route('/analytics', methods=['GET'])
def perform_analytics():
    # Retrieve data from the request payload
    data = collection1.find()

    # Call your Python analytics script
    result = analytics.run_analytics(data)

    # Return the analytics result as a response
    return {
        'message' : 'Python file trigger was successful',
        'result' : result
    }




if __name__ == '__main__':
    app.run(port=3001) 
