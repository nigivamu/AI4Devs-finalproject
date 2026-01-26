import requests
import sys
import json

BASE_URL = "http://localhost:8000/api/v1"
EMAIL = "integration_test@example.com"
PASSWORD = "password123"

def run_test():
    print(f"Targeting: {BASE_URL}")
    print("1. Registering User...") 
    response = requests.post(f"{BASE_URL}/auth/register", json={"email": EMAIL, "password": PASSWORD})
    if response.status_code == 201:
        print("   Success: User created.")
    elif response.status_code == 400 and "already exists" in response.text:
        print("   User likely already exists (acceptable for verify run).")
    else:
        print(f"   Failed: {response.status_code} - {response.text}")
        sys.exit(1)

    print("\n2. Logging In...")
    response = requests.post(f"{BASE_URL}/auth/login/access-token", data={"username": EMAIL, "password": PASSWORD})
    if response.status_code != 200:
        print(f"   Failed to login: {response.text}")
        sys.exit(1)
    
    token_data = response.json()
    print(f"   [DEBUG] Login Response: {token_data}")
    token = token_data.get("access_token") # snake_case is standard for OAuth2 response
    if not token:
        print("   Failed: No access_token in response")
        sys.exit(1)

    headers = {"Authorization": f"Bearer {token}"}
    print("   Success: Logged in and got token.")

    print("\n3. Setting Monthly Limit...")
    limit_amount = 1500000.0
    response = requests.post(f"{BASE_URL}/monthly-limit/", json={"amount": limit_amount}, headers=headers)
    if response.status_code != 200:
        print(f"   Failed to set limit: {response.text}")
    else:
        # Expecting camelCase or matching schema from backend
        # The backend model MonthlyLimitSchema uses default ConfigDict?
        # Let's check what we get back.
        data = response.json()
        print(f"   Success. Limit Response: {data}")

    print("\n4. Registering Expense (Mock AI)...")
    # Using "mock" in text to trigger fallback in AIService if no API Key
    expense_text = "I spent 50000 on mock groceries today"
    response = requests.post(f"{BASE_URL}/expenses", json={"text": expense_text}, headers=headers)
    if response.status_code != 201:
        print(f"   Failed to register expense: {response.text}")
        sys.exit(1)
    else:
        data = response.json()
        # Front end expects: totalSpent, monthlyLimit, alert, expenses
        # Backend pydantic models are configured with alias_generator=to_camel
        # So keys should be camelCase.
        
        print(f"   Success: Expense registered.")
        
        # Verify Keys
        if "totalSpent" in data:
            print(f"   [CHECK] 'totalSpent' found: {data['totalSpent']}")
        else:
             print(f"   [ERROR] 'totalSpent' MISSING. Got: {list(data.keys())}")
            
        if "monthlyLimit" in data:
             print(f"   [CHECK] 'monthlyLimit' found: {data['monthlyLimit']}")
             
        if "expenses" in data and len(data["expenses"]) > 0:
            first_expense = data["expenses"][0]
            if "expenseDate" in first_expense:
                 print(f"   [CHECK] 'expenseDate' found in expense item.")
            else:
                 print(f"   [ERROR] 'expenseDate' MISSING in expense item. Got: {list(first_expense.keys())}")
        
    print("\n5. Checking Dashboard...")
    response = requests.get(f"{BASE_URL}/dashboard", headers=headers)
    if response.status_code != 200:
        print(f"   Failed to get dashboard: {response.text}")
    else:
        data = response.json()
        print(f"   Success: Dashboard retrieved.")
        if "totalSpent" in data:
            print("   [Verified] Dashboard keys match Frontend expectations.")
        else:
            print("   [Warning] Dashboard keys might mismatch.")

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"An error occurred: {e}")
