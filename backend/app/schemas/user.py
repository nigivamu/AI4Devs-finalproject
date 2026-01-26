from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict
from app.schemas.utils import to_camel

# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str

# Properties to return via API
class User(UserBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True, alias_generator=to_camel, populate_by_name=True)

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    
    model_config = ConfigDict(populate_by_name=True)

class TokenData(BaseModel):
    email: Optional[str] = None

