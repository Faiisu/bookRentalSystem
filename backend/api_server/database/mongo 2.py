import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables
load_dotenv()

# MongoDB Connection Setup
MONGO_URL = os.getenv("MONGO_URL")

mongo_client = AsyncIOMotorClient(MONGO_URL)
mongo_database = mongo_client["bookStoreDB"]  # Select database

# Collections dictionary for better modular access
mongo_collection = {
    "books": mongo_database["books"],
}

def get_mongo_collection(collection_name: str):
    """Get the specified MongoDB collection."""
    return mongo_collection.get(collection_name)