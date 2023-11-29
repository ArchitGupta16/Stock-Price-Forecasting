from pymongo import MongoClient

# for normal running with only docker containers
# client = MongoClient('mongodb://admin:password@localhost:8100') 

# For Docker compose up use this
client = MongoClient('mongodb://admin:password@mongodb') 

# Trying for kubernetes
# client = MongoClient('mongodb://admin:password@mongodb') 
# client = MongoClient("mongodb://mongo:27017")

database = client['SPF'] 
    
# return user_collection
