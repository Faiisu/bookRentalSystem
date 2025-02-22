import os
from dotenv import load_dotenv
import pymysql
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()
# mongodb connect setup
mongo_URL = os.getenv("MONGO_URL")
mongo_client = AsyncIOMotorClient(mongo_URL)

mongo_database = mongo_client["dataBaseName"] #choose database
mongo_collection = { #choose collection
    "myCollection" : mongo_database["myCollection"] 
}



def get_sqldb():
    conn = pymysql.connect(
        host=os.getenv("DB_SERVER"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("SQL_PORT")),
        cursorclass=pymysql.cursors.DictCursor
    )
    try:
        yield conn
    finally:
        conn.close()
