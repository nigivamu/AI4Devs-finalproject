from datetime import date, datetime
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.utils import to_camel

# Input payload
class ExpenseInput(BaseModel):
    text: str = Field(..., min_length=3, example="Paid 50 for lunch today")

# Schema for creating expense (internal use after extraction)
class ExpenseCreate(BaseModel):
    amount: Decimal
    category: Optional[str] = "Uncategorized"
    description: Optional[str] = None
    expense_date: date
    
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

# Output Schema
class Expense(ExpenseCreate):
    id: int
    user_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True, alias_generator=to_camel, populate_by_name=True)

# Dashboard Schema (including Alert)
class Alert(BaseModel):
    message: str

class DashboardResponse(BaseModel):
    monthly_limit: float
    total_spent: float
    expenses: list[Expense]
    alert: Optional[Alert] = None
    
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

