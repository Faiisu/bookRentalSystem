import os
import pymysql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_sqldb():
    """Provides a connection to the MySQL database using a generator."""
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