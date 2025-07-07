def convert_height_to_m(height, unit):
    if unit == "cm":
        return height / 100
    elif unit == "in":
        return height * 0.0254
    return height

def convert_weight_to_kg(weight, unit):
    if unit == "kg":
        return weight
    elif unit == "lb":
        return weight * 0.453592
    return weight
