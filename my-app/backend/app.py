from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
from flask_cors import CORS
import analytics

app = Flask(__name__)
CORS(app)

# Configure MongoDB connection
client = MongoClient('MONGO_URL')
db = client['MichiganTeachers']
collection = db['FormTeachers']
collection1 = db['ExcelTeachers']
collection2 = db['ExcelAnalytics']
collection3 = db['FormAnalytics']



# Post form data into DB
@app.route("/submit", methods=["POST"])
def submit_form():

    data = request.get_json()

    # Convert relevant fields to integers
    years = int(data['years'])
    base = float(data['base'])
    fica = float(data['fica'])
    retirement = float(data['retirement'])
    total = float(data['total'])
    fte = float(data['fte'])

    # Create a document to insert into the collection
    document = {
        'degree': data['degree'],
        'fte': fte,
        'years': years,
        'base': base,
        'fica': fica,
        'retirement': retirement,
        'total': total,
        'feedback': data['feedback']
    }

    # Insert the document into the collection
    collection.insert_one(document)

    # Return a response
    response = {'message': 'Form data submitted successfully!'}
    return jsonify(response)



# To post data from excel sheet to DB
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



# To retrieve data
@app.route("/data", methods=["GET"])
def get_data():
    #data = collection1.find()
    data = collection2.find_one({}, sort=[('_id', -1)])

    data['_id'] = str(data['_id'])

    #print(result)
    return jsonify(data)

@app.route("/formdata", methods=["GET"])
def get_form_data():
    #data = collection1.find()
    data = collection3.find_one({}, sort=[('_id', -1)])

    data['_id'] = str(data['_id'])

    #print(result)
    return jsonify(data)



# Trigger python script and add returned analytics value into another collection
@app.route('/analytics', methods=['POST'])
def perform_analytics():
    # Retrieve data from the request payload
    data = collection1.find()
    analyticsData = []
    for document in data:
        document['_id'] = str(document['_id'])
        analyticsData.append(document)

    result = analytics.run_analytics(analyticsData)

    collection2.insert_one(result)
    

    # Return the analytics result as a response
    return {
        'message' : 'Python file trigger was successful',
        'result' : result
    }



@app.route('/formanalytics', methods=['POST'])
def perform_analytics_form():
    # Retrieve data from the request payload
    data = collection.find()
    print(data)
    analyticsData = []
    for document in data:
        document['_id'] = str(document['_id'])
        analyticsData.append(document)

    
    result = analytics.run_analytics(analyticsData)

    collection3.insert_one(result)
    

    # Return the analytics result as a response
    return {
        'message' : 'Python file trigger was successful',
        'result' : result
        
    }




if __name__ == '__main__':
    app.run(port=3001) 
