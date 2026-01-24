import json
from datetime import date
from typing import Any, Dict, Optional
from openai import OpenAI
from app.core.config import settings

class AIService:
    def __init__(self):
        # Initialize only if key is present to avoid errors during init
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

    def extract_expense_data(self, text: str) -> Dict[str, Any]:
        """
        Extracts amount, category, date, and description from natural language text using LLM.
        """
        if not self.client:
            # Fallback for when no API key is set (Mock behavior for testing/MVP setup)
            # In a real scenario, we might want to raise an error.
            # For now, let's try a very basic heuristic or return a designated error.
            if "mock" in text.lower():
                 return {
                    "amount": 100.0,
                    "category": "General",
                    "expense_date": date.today().isoformat(),
                    "description": "Mock expense"
                }
            raise ValueError("OpenAI API Key not set. Cannot process Natural Language.")

        today_str = date.today().isoformat()
        
        prompt = f"""
        You are an assistant that extracts structured data from expense descriptions.
        Current Date: {today_str}
        
        Input Text: "{text}"
        
        Extract the following fields in JSON format:
        - amount (number): The numeric value of the expense.
        - category (string): A short category (e.g., Food, Transport, Utilities). Infer if not explicit.
        - expense_date (string): ISO 8601 date (YYYY-MM-DD). If "today", use {today_str}. Inference required.
        - description (string): A clean description of the expense.
        
        Response must be ONLY valid JSON.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that extracts expense data."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0,
                max_tokens=150
            )
            
            content = response.choices[0].message.content.strip()
            # Clean up potential markdown code blocks if the model adds them
            if content.startswith("```json"):
                content = content[7:]
            if content.endswith("```"):
                content = content[:-3]
            
            data = json.loads(content)
            return data
            
        except Exception as e:
            print(f"Error calling AI Service: {e}")
            raise ValueError(f"Failed to process expense text: {str(e)}")

ai_service = AIService()
