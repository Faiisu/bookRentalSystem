from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import base64
import json 
import certifi

ca = certifi.where()
uri = "mongodb://localhost:27017"
client = MongoClient(uri,  tlsCAFile=ca)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)