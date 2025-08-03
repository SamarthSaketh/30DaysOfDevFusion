import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the model
model = genai.GenerativeModel('models/gemini-1.5-flash')  # much faster, higher limits

# Chat function
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def chat_with_gemini(prompt, model="gemini-1.5-flash"):
    try:
        response = genai.GenerativeModel(model).generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ Error: {str(e)}"


if __name__ == "__main__":
    print(chat_with_gemini("Tell me a fun fact about space"))
