def get_health_tips(category):
    if "Underweight" in category:
        return (
            "• Increase protein intake\n"
            "• Eat more frequently\n"
            "• Include healthy fats and snacks\n"
            "• Consider strength training"
        )
    elif "Normal" in category:
        return (
            "• Maintain a balanced diet\n"
            "• Keep active and hydrated\n"
            "• Continue regular checkups\n"
            "• Manage stress and sleep well"
        )
    elif "Overweight" in category:
        return (
            "• Reduce sugar & processed foods\n"
            "• Include cardio and fiber-rich food\n"
            "• Drink plenty of water\n"
            "• Practice portion control"
        )
    elif "Obese" in category:
        return (
            "• Consult a healthcare provider\n"
            "• Focus on low-carb, nutrient-dense meals\n"
            "• Increase daily activity\n"
            "• Monitor progress weekly"
        )
    return "• No tips available"
