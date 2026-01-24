from datetime import datetime, date
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.expense import Expense
from app.models.monthly_limit import MonthlyLimit
from app.schemas.expense import ExpenseInput, DashboardResponse, Alert
from app.services.ai_client import ai_service
from app.models.user import User

router = APIRouter()
dashboard_router = APIRouter()

@router.post("/expenses", response_model=DashboardResponse, status_code=201, tags=["expenses"])
def create_expense(
    *,
    db: Session = Depends(deps.get_db),
    expense_in: ExpenseInput,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Register a new expense via natural language.
    """
    try:
        extracted_data = ai_service.extract_expense_data(expense_in.text)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    expense = Expense(
        user_id=current_user.id,
        amount=extracted_data["amount"],
        category=extracted_data.get("category", "General"),
        description=extracted_data.get("description", expense_in.text),
        expense_date=datetime.strptime(extracted_data["expense_date"], "%Y-%m-%d").date()
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)

    return get_dashboard_data(db, current_user)


@dashboard_router.get("/dashboard", response_model=DashboardResponse, tags=["dashboard"])
def get_dashboard(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    return get_dashboard_data(db, current_user)


def get_dashboard_data(db: Session, user: User) -> DashboardResponse:
    current_month_str = datetime.now().strftime("%Y-%m")
    current_month_date = datetime.now().date()
    
    limit_obj = db.query(MonthlyLimit).filter(
        MonthlyLimit.user_id == user.id,
        MonthlyLimit.month == current_month_str
    ).first()
    monthly_limit = float(limit_obj.amount) if limit_obj else 0.0

    start_of_month = current_month_date.replace(day=1)
    
    expenses_query = db.query(Expense).filter(
        Expense.user_id == user.id,
        Expense.expense_date >= start_of_month
    ).order_by(Expense.expense_date.desc()).all()

    total_spent = sum(float(e.amount) for e in expenses_query)

    alert = None
    if monthly_limit > 0 and total_spent > monthly_limit:
        over = total_spent - monthly_limit
        alert = Alert(message=f"Alert: You have exceeded your monthly limit of {monthly_limit} by {over:.2f}. Be careful!")

    return DashboardResponse(
        monthly_limit=monthly_limit,
        total_spent=total_spent,
        expenses=expenses_query,
        alert=alert
    )
