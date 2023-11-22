from pymongo import MongoClient

client = MongoClient('mongodb://admin:password@mongodb') 
database = client['SPF'] 

# return user_collection
