from fastapi import FastAPI, Depends

from database import mongo_collection, get_sqldb
from bson import ObjectId

app = FastAPI()

#################### sql #####################
# create table in MySql (if not exits)

@app.get("/users")
def get_users(db=Depends(get_sqldb)):
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
    return {"users": users}

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