from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "customer"
    created_at: datetime = datetime.utcnow()

class Product(BaseModel):
    name: str
    description: Optional[str]
    price: float
    category: str
    stock: int
    image_url: Optional[str]
    created_at: datetime = datetime.utcnow()

class CartItem(BaseModel):
    product_id: str
    name: str
    quantity: int
    price: float

class Cart(BaseModel):
    user_id: str
    items: List[CartItem]

class Order(BaseModel):
    user_id: str
    items: List[CartItem]
    total_price: float
    status: str = "pending"
    created_at: datetime = datetime.utcnow()