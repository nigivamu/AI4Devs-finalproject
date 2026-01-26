from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, String, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class MonthlyLimit(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, unique=False)
    month = Column(String, nullable=False) # Format YYYY-MM
    amount = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
