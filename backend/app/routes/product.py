from fastapi import APIRouter
from app.database import db, serialize_product

router = APIRouter()

@router.get("/")
async def get_products():
    products = await db.products.find().to_list(100)  # Fetch products from MongoDB
    return {"products": [serialize_product(product) for product in products]}  # ✅ Fix ObjectId