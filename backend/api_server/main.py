from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_sqldb  # เชื่อมต่อ MySQL
from mySQL_models import CreateUser  # Import Pydantic Schema

app = FastAPI()

#################### CORS #####################
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#################### SQL #####################
# ✅ ใช้ `cursor.execute()` เหมือนกันทั้ง GET และ POST

@app.get("/users")
def get_users(db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email FROM users")  # 🔹 ห้ามดึง password เพื่อความปลอดภัย
        users = cursor.fetchall()
    return {"users": users}

@app.post("/users")
def add_user(user: CreateUser, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        # ✅ ตรวจสอบว่า Email ซ้ำหรือไม่
        cursor.execute("SELECT email FROM users WHERE email = %s", (user.email,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # ✅ เพิ่ม User ใหม่
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s)", 
            (user.email, user.password)
        )
        db.commit()  # 🔹 ต้อง commit() เพื่อบันทึกข้อมูลลง MySQL
        user_id = cursor.lastrowid  # ✅ ได้ ID ที่ถูกเพิ่มล่าสุด

    return {"id": user_id, "email": user.email}

@app.delete("/users/{email}")
def delete_user(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email FROM users WHERE email = %s", email)
        existing_user = cursor.fetchone()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        cursor.execute("DELETE FROM users WHERE email = %s", email)
        db.commit()
    return {"Message" : f"User {email} deleted successfully"}


#################### MongoDB #####################
# add data into MongoDB
@app.post("/add/")
async def add_item(item: dict):
    result = await mongo_collection["myCollection"].insert_one(item)
    return {"inserted_id": str(result.inserted_id)}

# query all.
@app.get("/items/")
async def get_items():
    items = []
    async for item in mongo_collection["myCollection"].find():
        item["_id"] = str(item["_id"])  # แปลง ObjectId เป็น string
        items.append(item)
    return items

# query from ID.
@app.get("/items/{item_id}")
async def get_item(item_id: str):
    item = await mongo_collection["myCollection"].find_one({"_id": ObjectId(item_id)})
    if item:
        item["_id"] = str(item["_id"])
        return item
    return {"error": "Item not found"}

# delete by ID
@app.delete("/items/{item_id}")
async def delete_item(item_id: str):
    result = await mongo_collection["myCollection"].delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count:
        return {"message": "Deleted successfully"}
    return {"error": "Item not found"}