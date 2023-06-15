from flask import Flask, jsonify
from pymongo import MongoClient
from urllib.parse import quote_plus

app = Flask(__name__)

# Configure MongoDB connection
username = quote_plus('Cluster22246@admin')
password = quote_plus('Chicken@11')

# Configure MongoDB connection
client = MongoClient('mongodb+srv://Cluster22246:Chicken@11@cluster22246.pqftw5p.mongodb.net/?retryWrites=true&w=majority')
db = client['MichiganTeachers']
collection = db['Michiganteachers']

@app.route('/api/check-connection', methods=['GET'])
def check_connection():
    try:
        collection_stats = db.command('collstats', 'Michiganteachers')
        return jsonify({'message': 'Database connected successfully.'})
    except Exception as e:
        return jsonify({'message': f'Database connection error: {str(e)}'})
    
print(check_connection())

