from pymongo import MongoClient
from flask import Blueprint, request

user_blueprint = Blueprint("user", __name__)

client = MongoClient('mongodb://admin:password@localhost:8100') 
db = client['user'] 
collection = db['data'] 

@user_blueprint.route('/add_data', methods=['POST']) 
def add_data(): 
    data = request.json 
    collection.insert_one(data) 
    return 'Data added to MongoDB'