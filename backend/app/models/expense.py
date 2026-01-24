from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, String, Date, DateTime, Text
from sqlalchemy.sql import func
from app.db.base import Base

class Expense(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    category = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    expense_date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
