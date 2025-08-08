def calculate_bmi(weight_kg, height_m):
    return weight_kg / (height_m ** 2)

def ideal_weight_range(height_m):
    low = 18.5 * (height_m ** 2)
    high = 24.9 * (height_m ** 2)
    return low, high
