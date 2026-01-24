from datetime import datetime
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel, Field, validator

# Properties to receive via API on creation/update
class MonthlyLimitCreate(BaseModel):
    amount: Decimal = Field(..., gt=0, description="Monthly limit amount must be greater than 0")

# Properties to return via API
class MonthlyLimit(MonthlyLimitCreate):
    id: int
    user_id: int
    month: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
