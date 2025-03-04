from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from database import get_sqldb  # เชื่อมต่อ MySQL
from mySQL_models import *

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
        cursor.execute("SELECT email,name FROM Member")  # 🔹 ห้ามดึง password เพื่อความปลอดภัย
        users = cursor.fetchall()
    return {"Members": users}

@app.get("/users/{email}")
def get_users_by_email(email: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email, name FROM Member where email = %s", email)
        existing_user = cursor.fetchone()
        if existing_user:
            return {"Member": existing_user}
        else:
            raise HTTPException(status_code=404, detail="email not found")
        
@app.get("/users/{email}/{password}")
def login_user(email: str, password: str, db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT email, name FROM Member where email = %s and password = %s", (email, password))
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
            "INSERT INTO Member (email, name, password) VALUES (%s, %s, %s)", 
            (user.email, user.name, user.password)
        )
        db.commit()  # 🔹 ต้อง commit() เพื่อบันทึกข้อมูลลง MySQL
        user_id = cursor.lastrowid  # ✅ ได้ ID ที่ถูกเพิ่มล่าสุด

    return {"id": user_id, "email": user.email}



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