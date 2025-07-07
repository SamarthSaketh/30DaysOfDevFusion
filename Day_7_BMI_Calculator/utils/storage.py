import json
import os
from datetime import datetime
from utils.tips import get_health_tips  # 👈 Import tips here

HISTORY_FILE = "bmi_history.json"

def save_to_json(height, height_unit, weight, weight_unit, bmi, category):
    tips = get_health_tips(category)  # 👈 Get tips based on BMI category

    entry = {
        "date_time": datetime.now().strftime("%d %B %Y, %H:%M"),
        "height": f"{height} {height_unit}",
        "weight": f"{weight} {weight_unit}",
        "bmi": f"{bmi:.2f}",
        "category": category,
        "tips": tips  # 👈 Include tips in saved entry
    }

    try:
        with open(HISTORY_FILE, "r") as file:
            data = json.load(file)
    except (FileNotFoundError, json.decoder.JSONDecodeError):
        data = []

    data.append(entry)

    with open(HISTORY_FILE, "w") as file:
        json.dump(data, file, indent=4)

def read_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, "r") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []

def clear_history():
    with open(HISTORY_FILE, "w") as file:
        file.write("[]")
