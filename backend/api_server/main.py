from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from mySQL_models import *
from typing import Optional, List
from bson.objectid import ObjectId

from mongo_models import Book
from database.mongo import mongo_collection
from database.mysql import get_sqldb

from bson import ObjectId

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
def is_valid_object_id(book_id: str) -> bool:
    try:
        ObjectId(book_id)  # Try converting the string to ObjectId
        return True
    except Exception:
        return False


###################### SQL ##############################################################


########### user data query #########
# ✅ ใช้ `cursor.execute()` เหมือนกันทั้ง GET และ POST

@app.get("/users")
def get_users(db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT member_id, email, username, firstName, lastName, birthday, end_date, rank_name as member_rank, point, discount FROM Member, ranks_permission WHERE Member.rank_id = ranks_permission.rank_id")  # 🔹 ห้ามดึง password เพื่อความปลอดภัย
        users = cursor.fetchall()
    return {"Members": users}

@app.get("/users/{email}")
def get_users_by_email(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT member_id, email, username, birthday, end_date, rank_name as member_rank, point, discount FROM Member, ranks_permission WHERE email = %s AND Member.rank_id = ranks_permission.rank_id", email)
        existing_user = cursor.fetchone()
        if existing_user:
            return {"Member": existing_user}
        else:
            raise HTTPException(status_code=404, detail="email not found")
        
@app.get("/users/{email}/{password}")
def login_user(email: str, password: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT member_id, email, username, firstName, lastName, birthday, end_date, rank_name as member_rank, point, discount FROM Member, ranks_permission where email = %s and password = %s AND Member.rank_id = ranks_permission.rank_id", (email, password))
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

        # ✅ เพิ่ม User ใหม่, handle birthday as NULL if not provided
        cursor.execute(
            "INSERT INTO Member (email, username, password, firstName, lastName, birthday, rank_id) VALUES (%s, %s, %s, %s, %s, %s, 1)", 
            (user.email, user.username, user.password, user.firstName, user.lastName, user.birthday)
        )
        db.commit()  # 🔹 ต้อง commit() เพื่อบันทึกข้อมูลลง MySQL
        user_id = cursor.lastrowid  # ✅ ได้ ID ที่ถูกเพิ่มล่าสุด

    return {"id": user_id, "email": user.email, "username": user.username, "firstname": user.firstName, "lastname": user.lastName, "birthday": user.birthday}

@app.put("/users/{email}")
def update_user(email: str, user: UpdateMember, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        # First, verify that the user exists
        cursor.execute("SELECT email FROM Member WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Build the SQL update dynamically based on provided fields
        update_fields = []
        params = []
        
        if user.username is not None:
            update_fields.append("username = %s")
            params.append(user.username)
        if user.firstName is not None:
            update_fields.append("firstName = %s")
            params.append(user.firstName)
        if user.lastName is not None:
            update_fields.append("lastName = %s")
            params.append(user.lastName)
        if user.birthday is not None:
            update_fields.append("birthday = %s")
            params.append(user.birthday)
        
        if not update_fields:
            raise HTTPException(status_code=400, detail="No fields provided for update")
        
        # Append the email parameter for the WHERE clause
        params.append(email)
        sql = f"UPDATE Member SET {', '.join(update_fields)} WHERE email = %s"
        cursor.execute(sql, params)
        db.commit()
        
    return {"Message": f"User {email} updated successfully"}

@app.delete("/deleteuser/{email}")
def delete_user(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email FROM Member WHERE email = %s", email)
        existing_user = cursor.fetchone()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        cursor.execute("DELETE FROM Member WHERE email = %s", email)
        db.commit()
    return {"Message" : f"User {email} deleted successfully"}

########### Admin data query #########

@app.get("/admins/{email}/{password}")
def login_admin(email: str, password: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT name, position, salary, birthday, phone, email FROM Employee where email = %s and password = %s", (email, password))
        existing_user = cursor.fetchone()
        if existing_user:
            return {"Employee": existing_user}
        else:
            raise HTTPException(status_code=404, detail="email not found")
        
@app.get("/transactionsHeader")
def get_users(db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM Transaction_Header")  # 🔹 ห้ามดึง password เพื่อความปลอดภัย
        trans = cursor.fetchall()
    return {"transactions": trans}


###################### MONGO DB ##############################################################

# Product Part


# ✅ Get all books
@app.get("/books")
async def get_books():
    books_cursor = mongo_collection["books"].find()
    books = await books_cursor.to_list(length=100)

    # ✅ Ensure `_id` is included and converted to a string
    books_with_id = [{**book, "_id": str(book["_id"])} for book in books]

    return {"books": books_with_id} 


@app.get("/books/bestsellers")
async def get_best_sellers():
    books_cursor = mongo_collection["books"].find().sort("sold_count", -1).limit(3)
    books = await books_cursor.to_list(length=3)

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


from fastapi import HTTPException
from bson import ObjectId

# This function will update a book in MongoDB
@app.put("/books/{book_id}", response_model=Book)
async def update_book(book_id: str, book: Book):
    # Ensure _id is removed from the update payload since _id is immutable
    book_dict = {k: v for k, v in book.dict(by_alias=True).items() if k != "_id"}

    # Perform the update operation without modifying the _id field
    result = await mongo_collection["books"].update_one(
        {"_id": ObjectId(book_id)},  # The condition for finding the document
        {"$set": book_dict}  # Update the fields except _id
    )

    # Check if the update was successful
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")

    return {**book.dict(), "id": book_id}  # Return the updated book


# ✅ Delete a book
@app.delete("/books/{book_id}")
async def delete_book(book_id: str):
    print(f"Received book_id: {book_id}")  # Log the received book_id for debugging

    # Validate book_id
    if not is_valid_object_id(book_id):
        raise HTTPException(status_code=400, detail="Invalid Book ID")

    
    # Perform the deletion operation
    result = await mongo_collection["books"].delete_one({"_id": ObjectId(book_id)})  # Correct use of ObjectId
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return {"message": "Book deleted successfully"}


from fastapi import HTTPException
from bson import ObjectId

@app.post("/books", response_model=Book)
async def add_book(book: Book):
    try:
        # Remove _id from the incoming book data as MongoDB will generate this automatically
        book_dict = book.dict(by_alias=True)
        
        # Insert book into MongoDB, MongoDB will generate the _id
        result = await mongo_collection["books"].insert_one(book_dict)
        
        # Fetch the inserted book with the generated _id
        inserted_book = await mongo_collection["books"].find_one({"_id": result.inserted_id})

        if not inserted_book:
            raise HTTPException(status_code=400, detail="Failed to add book")

        # Return the newly added book including the generated _id
        inserted_book["_id"] = str(inserted_book["_id"])  # Convert ObjectId to string
        return inserted_book
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding book: {str(e)}")