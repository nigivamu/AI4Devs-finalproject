from datetime import datetime
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.monthly_limit import MonthlyLimit
from app.schemas.monthly_limit import MonthlyLimitCreate, MonthlyLimit as MonthlyLimitSchema
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=MonthlyLimitSchema)
def create_or_update_monthly_limit(
    *,
    db: Session = Depends(deps.get_db),
    limit_in: MonthlyLimitCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Set or update the monthly limit for the current month.
    """
    current_month = datetime.now().strftime("%Y-%m")
    
    # Check if limit exists for this month
    limit = db.query(MonthlyLimit).filter(
        MonthlyLimit.user_id == current_user.id,
        MonthlyLimit.month == current_month
    ).first()
    
    if limit:
        # Update existing
        limit.amount = limit_in.amount
        limit.updated_at = datetime.now()
    else:
        # Create new
        limit = MonthlyLimit(
            user_id=current_user.id,
            month=current_month,
            amount=limit_in.amount
        )
        db.add(limit)
    
    db.commit()
    db.refresh(limit)
    return limit
