from motor.motor_asyncio import AsyncIOMotorClient
import os
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import jwt
import datetime

# ✅ MongoDB Connection URL (Change based on where MongoDB is running)
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")  # Use "mongodb://mongo-db:27017" if running inside Docker

# ✅ Connect to MongoDB
client = AsyncIOMotorClient(MONGO_URL)
db = client["ecommerce"]  # Database name
users_collection = db["users"]

# ✅ Test Connection (Ping)
async def check_mongo_connection():
    try:
        await db.command("ping")
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print("❌ MongoDB Connection Error:", e)


def serialize_product(product):
    return {
        "_id": str(product["_id"]),  # Convert ObjectId to string when sending response
        "name": product.get("name", ""),
        "price": product.get("price", 0),
        "category": product.get("category", ""),
    }


async def get_user(email: str):
    """Retrieve a user by email."""
    return await users_collection.find_one({"email": email})

async def create_user(user_data: dict):
    """Insert a new user into the database."""
    await users_collection.insert_one(user_data)