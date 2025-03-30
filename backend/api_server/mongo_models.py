from pydantic import BaseModel, Field, HttpUrl
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Book(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    author: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    price: float = Field(..., gt=0)  # Price must be positive
    category: str = Field(..., min_length=1, max_length=100)
    stock: int = Field(..., ge=0)  # Stock can't be negative
    image_url: Optional[str] = None  # Ensures valid URL
    sold_count: int = Field(default=0, ge=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    

    class Config:
        json_encoders = {ObjectId: str}  # Convert ObjectId to string for JSON
        allow_population_by_field_name = True
        extra = "allow"