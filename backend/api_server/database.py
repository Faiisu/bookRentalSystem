import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()
# mongodb connect setup
mongo_URL = os.getenv("MONGO_URL")
mongo_client = AsyncIOMotorClient(mongo_URL)

mongo_database = mongo_client["dataBaseName"] #choose database
mongo_collection = { #choose collection
    "myCollection" : mongo_database["myCollection"] 
}
