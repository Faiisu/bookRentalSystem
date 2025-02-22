from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from bson.objectid import ObjectId
from app.database import db
from app.models import Product, Order
from app.database import get_user, create_user
from pydantic import BaseModel
import jwt
import datetime
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import List

app = FastAPI()

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the E-Commerce API"}

@app.get("/health")
async def health_check():
    try:
        await db.command("ping")
        return {"status": "MongoDB is connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MongoDB connection failed: {str(e)}")

# Product routes
@app.get("/products")
async def get_products():
    products = await db.products.find().to_list(100)
    serialized_products = [
        {
            "_id": str(product["_id"]),
            "name": product.get("name", ""),
            "price": product.get("price", 0),
            "category": product.get("category", ""),
        }
        for product in products
    ]
    return {"products": serialized_products}

@app.post("/products", response_model=Product)
async def add_product(product: Product):
    product_dict = product.dict()
    result = await db.products.insert_one(product_dict)
    product.id = str(result.inserted_id)
    return product

@app.get("/products/{product_id}")
async def get_product(product_id: str):
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return product

@app.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: Product):
    result = await db.products.update_one({"_id": ObjectId(product_id)}, {"$set": product.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {**product.dict(), "id": product_id}

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

# JWT Token Generator
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(email: str):
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode = {"sub": email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# User models
class UserSignup(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# User routes
@app.post("/signup")
async def signup(user: UserSignup):
    existing_user = await get_user(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(user.password)
    await create_user({"email": user.email, "password": hashed_password})
    return {"message": "User created successfully"}

@app.post("/login")
async def login(user: UserLogin):
    stored_user = await get_user(user.email)
    if not stored_user or not pwd_context.verify(user.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(user.email)
    return {"access_token": token}

# Cart routes
@app.post("/cart")
async def add_to_cart(user_email: str, product_id: str, quantity: int):
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item = {
        "user_email": user_email,
        "product_id": product_id,
        "quantity": quantity,
        "price": product['price']
    }
    result = await db.cart.insert_one(cart_item)
    return {"message": "Item added to cart", "cart_id": str(result.inserted_id)}

@app.get("/cart/{user_email}")
async def get_cart(user_email: str):
    cart_items = await db.cart.find({"user_email": user_email}).to_list(100)
    if not cart_items:
        raise HTTPException(status_code=404, detail="No items found in cart")
    return cart_items

# Order routes
@app.post("/order")
async def place_order(user_email: str, cart_items: List[str]):
    cart = await db.cart.find({"_id": {"$in": [ObjectId(item_id) for item_id in cart_items]}}).to_list(100)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart is empty")
    
    order_total = sum(item["price"] * item["quantity"] for item in cart)

    order = Order(user_email=user_email, items=cart, total_price=order_total)
    result = await db.orders.insert_one(order.dict())
    
    # Remove items from cart after order placement
    await db.cart.delete_many({"_id": {"$in": [ObjectId(item["_id"]) for item in cart]}})
    
    return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}

@app.get("/order/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order