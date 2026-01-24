from datetime import date, datetime
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel, Field

# Input payload
class ExpenseInput(BaseModel):
    text: str = Field(..., min_length=3, example="Paid 50 for lunch today")

# Schema for creating expense (internal use after extraction)
class ExpenseCreate(BaseModel):
    amount: Decimal
    category: Optional[str] = "Uncategorized"
    description: Optional[str] = None
    expense_date: date

# Output Schema
class Expense(ExpenseCreate):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Dashboard Schema (including Alert)
class Alert(BaseModel):
    message: str

class DashboardResponse(BaseModel):
    monthly_limit: float
    total_spent: float
    expenses: list[Expense]
    alert: Optional[Alert] = None
