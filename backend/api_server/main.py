from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from mySQL_models import *
from typing import Optional, List
from bson.objectid import ObjectId

from mongo_models import Book
from database.mongo import mongo_collection
from database.mysql import get_sqldb

app = FastAPI()

#################### CORS #####################
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
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
        cursor.execute("SELECT * FROM Member")  # 🔹 ห้ามดึง password เพื่อความปลอดภัย
        users = cursor.fetchall()
    return {"Members": users}

@app.get("/users/{email}")
def get_users_by_email(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT member_id, email, username, birthday, end_date, member_rank, point, discount FROM Member where email = %s", email)
        existing_user = cursor.fetchone()
        if existing_user:
            return {"Member": existing_user}
        else:
            raise HTTPException(status_code=404, detail="email not found")
        
@app.get("/users/{email}/{password}")
def login_user(email: str, password: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT member_id, email, username, firstName, lastName, birthday, end_date, member_rank, point, discount FROM Member where email = %s and password = %s", (email, password))
        existing_user = cursor.fetchone()
        if existing_user:
            return {"Member": existing_user}
        else:
            raise HTTPException(status_code=404, detail="email not found")


@app.post("/users")
def add_user(user: CreateMember, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        # ✅ ตรวจสอบว่า Email ซ้ำหรือไม่
        cursor.execute("SELECT email FROM Member WHERE email = %s", (user.email,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # ✅ เพิ่ม User ใหม่
        cursor.execute(
            "INSERT INTO Member (email, username, password, firstName, lastName) VALUES (%s, %s, %s, %s, %s)", 
            (user.email, user.username, user.password, user.firstName, user.lastName)
        )
        db.commit()  # 🔹 ต้อง commit() เพื่อบันทึกข้อมูลลง MySQL
        user_id = cursor.lastrowid  # ✅ ได้ ID ที่ถูกเพิ่มล่าสุด

    return {"id": user_id, "email": user.email, "username": user.username, "firstname":user.firstName,"lastname":user.lastName}



@app.delete("/users/{email}")
def delete_user(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email FROM Member WHERE email = %s", email)
        existing_user = cursor.fetchone()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        cursor.execute("DELETE FROM Member WHERE email = %s", email)
        db.commit()
    return {"Message" : f"User {email} deleted successfully"}


############################### MONGO DB ######################################

# Product Part
# ✅ Add a new book
@app.post("/books", response_model=Book)
async def add_book(book: Book):
    book_dict = book.dict(by_alias=True)
    result = await mongo_collection["books"].insert_one(book_dict)
    book._id = str(result.inserted_id)
    return book


# ✅ Get all books
@app.get("/books")
async def get_books():
    books_cursor = mongo_collection["books"].find()
    books = await books_cursor.to_list(length=100)

    # ✅ Ensure `_id` is included and converted to a string
    books_with_id = [{**book, "_id": str(book["_id"])} for book in books]

    return {"books": books_with_id} 

# ✅ Get a book by ID
@app.get("/books/{book_id}", response_model=Book)
async def get_book(book_id: str):
    book = await mongo_collection["books"].find_one({"_id": ObjectId(book_id)})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book["_id"] = str(book["_id"])
    return book


# ✅ Update a book
@app.put("/books/{book_id}", response_model=Book)
async def update_book(book_id: str, book: Book):
    book_dict = {k: v for k, v in book.dict(by_alias=True).items() if v is not None}
    result = await mongo_collection["books"].update_one({"_id": ObjectId(book_id)}, {"$set": book_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {**book.dict(), "id": book_id}


# ✅ Delete a book
@app.delete("/books/{book_id}")
async def delete_book(book_id: str):
    result = await mongo_collection["books"].delete_one({"_id": ObjectId(book_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted"}