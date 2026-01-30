import requests
import sys

BASE_URL = "http://localhost:8000/api/v1"
EMAIL = "testuser@example.com"
PASSWORD = "password123"

def run_test():
    print("1. Registering User...")
    response = requests.post(f"{BASE_URL}/auth/register", json={"email": EMAIL, "password": PASSWORD})
    if response.status_code == 201:
        print("   Success: User created.")
    elif response.status_code == 400:
        print("   User likely already exists.")
    else:
        print(f"   Failed: {response.status_code} - {response.text}")
        sys.exit(1)

    print("\n2. Logging In...")
    response = requests.post(f"{BASE_URL}/auth/login/access-token", data={"username": EMAIL, "password": PASSWORD})
    if response.status_code != 200:
        print(f"   Failed to login: {response.text}")
        sys.exit(1)
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("   Success: Logged in and got token.")

    print("\n3. Setting Monthly Limit...")
    response = requests.post(f"{BASE_URL}/monthly-limit/", json={"amount": 500.0}, headers=headers)
    if response.status_code != 200:
        print(f"   Failed to set limit: {response.text}")
    else:
        print(f"   Success: Limit set to 500.0. Response: {response.json()}")

    print("\n4. Registering Expense (Mock AI)...")
    # Using "mock" in text to trigger fallback in AIService if no API Key
    expense_text = "I spent 50 on mock food today"
    response = requests.post(f"{BASE_URL}/expenses", json={"text": expense_text}, headers=headers)
    if response.status_code != 201:
        print(f"   Failed to register expense: {response.text}")
    else:
        data = response.json()
        print(f"   Success: Expense registered.")
        print(f"   Total Spent: {data['totalSpent']}")
        print(f"   Alert: {data['alert']}")

    print("\n5. Checking Dashboard...")
    response = requests.get(f"{BASE_URL}/dashboard", headers=headers)
    if response.status_code != 200:
        print(f"   Failed to get dashboard: {response.text}")
    else:
        data = response.json()
        print(f"   Success: Dashboard retrieved.")
        print(f"   Expenses Count: {len(data['expenses'])}")

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"An error occurred: {e}")
