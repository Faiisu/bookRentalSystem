from pydantic import BaseModel;
from datetime import date;

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional

class CreateMember(BaseModel):
    email: str
    password: str
    username: str
    firstName: str
    lastName: str
    birthday: Optional[date] = None
    
    class Config:
        orm_mode = True

class UpdateMember(BaseModel):
    username: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    birthday: Optional[str] = None
    
    class Config:
        orm_mode = True
    
# class UserResponse(BaseModel):
#     id: int
#     email: str
#     password: str
#     username: str
#     firstName: str
#     lastName: str
#     birthday: Optional[date] = None
    
    
        
#     class Config:
#         orm_mode = True
    
        
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(50), nullable=False)