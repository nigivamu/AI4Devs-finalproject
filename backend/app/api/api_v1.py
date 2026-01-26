from fastapi import APIRouter
from app.api.v1 import auth, expenses, limit

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(limit.router, prefix="/monthly-limit", tags=["limit"])
# endpoints are defined with paths "/expenses" and "/dashboard" inside the file
# so we include them without prefix or adjust the file.
# Expense router has @router.post("/expenses")
api_router.include_router(expenses.router) 
api_router.include_router(expenses.dashboard_router)
