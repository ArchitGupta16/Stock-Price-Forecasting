from pymongo import MongoClient
from flask import Blueprint, request

user_blueprint = Blueprint("user", __name__)

client = MongoClient('mongodb://127.0.0.1/demo') 
db = client['demo'] 
collection = db['data'] 

@user_blueprint.route('/add_data', methods=['POST']) 
def add_data(): 
    data = request.json 
    collection.insert_one(data) 
    return 'Data added to MongoDB'