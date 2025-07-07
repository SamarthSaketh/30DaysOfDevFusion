def classify_bmi(bmi):
    if bmi < 18.5:
        return "Underweight 😟", "blue"
    elif 18.5 <= bmi < 24.9:
        return "Normal ✅", "green"
    elif 25 <= bmi < 29.9:
        return "Overweight ⚠️", "orange"
    else:
        return "Obese ❌", "red"
