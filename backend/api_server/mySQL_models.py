from pydantic import BaseModel;

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

class CreateUser(BaseModel):
    email: str
    password: str
    
class UserResponse(BaseModel):
    id: int
    email: str
    
    class Config:
        orm_mode = True
        
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(50), nullable=False)