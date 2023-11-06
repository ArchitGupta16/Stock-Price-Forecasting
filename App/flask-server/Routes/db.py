from pymongo import MongoClient

client = MongoClient('mongodb://admin:password@localhost:8100') 
database = client['SPF'] 

# return user_collection
