import tkinter as tk
from tkinter import messagebox
from utils.conversions import convert_height_to_m, convert_weight_to_kg
from utils.calculator import calculate_bmi, ideal_weight_range
from utils.classification import classify_bmi
from utils.storage import save_to_json, read_history, clear_history
from utils.tips import get_health_tips
from utils.exporter import export_history_to_pdf

# ======================= Theme Setup ============================
is_dark = False
button_refs = {}
def toggle_dark_mode():
    global is_dark
    is_dark = not is_dark

    bg = "#121212" if is_dark else "white"
    fg = "white" if is_dark else "black"

    root.config(bg=bg)

    for widget in root.winfo_children():
        if isinstance(widget, tk.Frame):
            widget.config(bg=bg)
            for sub in widget.winfo_children():
                if isinstance(sub, tk.Button):
                    # Keep original button background, only change text color
                    sub.config(fg="white" if is_dark else "white")
                else:
                    try:
                        sub.config(bg=bg, fg=fg)
                    except:
                        pass
        else:
            try:
                widget.config(bg=bg, fg=fg)
            except:
                pass


# ======================= Core Functions ============================

def calculate():
    try:
        height = float(height_entry.get())
        weight = float(weight_entry.get())
        h_unit = height_unit_var.get()
        w_unit = weight_unit_var.get()

        height_m = convert_height_to_m(height, h_unit)
        weight_kg = convert_weight_to_kg(weight, w_unit)

        if height_m <= 0 or weight_kg <= 0:
            raise ValueError

        bmi = calculate_bmi(weight_kg, height_m)
        bmi_result.set(f"{bmi:.2f}")
        cat, color = classify_bmi(bmi)
        category.set(cat)
        category_label.config(fg=color)

        low, high = ideal_weight_range(height_m)
        ideal_range.set(f"{low:.1f} kg – {high:.1f} kg")
        tips.set(get_health_tips(cat))
        messagebox.showinfo("Health Tips", tips.get())
        save_to_json(height, h_unit, weight, w_unit, bmi, cat)

    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid values.")

def reset():
    height_entry.delete(0, tk.END)
    weight_entry.delete(0, tk.END)
    bmi_result.set("")
    category.set("")
    ideal_range.set("")
    tips.set("")
    category_label.config(fg="black")

def exit_app():
    root.destroy()

def show_history():
    history = read_history()
    if not history:
        messagebox.showinfo("History", "No BMI history found.")
        return

    history_window = tk.Toplevel(root)
    history_window.title("BMI History")
    history_window.geometry("400x300")

    text_area = tk.Text(history_window, wrap="word", font=("Segoe UI", 10))
    scrollbar = tk.Scrollbar(history_window, command=text_area.yview)
    text_area.configure(yscrollcommand=scrollbar.set)

    text_area.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    for entry in history:
        line = f"""
🗓️  {entry['date_time']}
📏 Height: {entry['height']}
⚖️ Weight: {entry['weight']}
📊 BMI: {entry['bmi']}
🏷️ Category: {entry['category']}
---------------------------
"""
        text_area.insert(tk.END, line)

def export_pdf():
    success = export_history_to_pdf()
    if success:
        messagebox.showinfo("Success", "BMI history exported to 'BMI_History_Report.pdf'")
    else:
        messagebox.showwarning("No Data", "No history to export.")

def confirm_clear_history():
    if messagebox.askyesno("Clear History", "Are you sure you want to delete all saved BMI records?"):
        clear_history()
        messagebox.showinfo("Cleared", "BMI history has been cleared.")

# ======================= GUI Setup ============================

root = tk.Tk()
root.title("Advanced BMI Calculator")
root.geometry("520x560")
root.resizable(False, False)

label_font = ("Segoe UI", 11)
result_font = ("Segoe UI", 14, "bold")

# Input Frame
frame = tk.Frame(root)
frame.pack(pady=10)

# Height
tk.Label(frame, text="Height:", font=label_font).grid(row=0, column=0, padx=5)
height_entry = tk.Entry(frame, font=label_font, width=10)
height_entry.grid(row=0, column=1, padx=5)
height_unit_var = tk.StringVar(value="cm")
tk.OptionMenu(frame, height_unit_var, "cm", "in").grid(row=0, column=2, padx=5)

# Weight
tk.Label(frame, text="Weight:", font=label_font).grid(row=1, column=0, padx=5, pady=5)
weight_entry = tk.Entry(frame, font=label_font, width=10)
weight_entry.grid(row=1, column=1, padx=5)
weight_unit_var = tk.StringVar(value="kg")
tk.OptionMenu(frame, weight_unit_var, "kg", "lb").grid(row=1, column=2, padx=5)

# Calculate Button
calc_btn = tk.Button(root, text="Calculate BMI", command=calculate, bg="#4CAF50", fg="white", font=label_font)
calc_btn.pack(pady=10)

# Output
tk.Label(root, text="Your BMI:", font=label_font).pack()
bmi_result = tk.StringVar()
tk.Label(root, textvariable=bmi_result, font=result_font).pack()

category = tk.StringVar()
category_label = tk.Label(root, textvariable=category, font=label_font)
category_label.pack(pady=5)

# Ideal Weight Range
tk.Label(root, text="🎯 Ideal Weight Range:", font=label_font).pack()
ideal_range = tk.StringVar()
tk.Label(root, textvariable=ideal_range, font=("Segoe UI", 11, "italic")).pack(pady=5)
tk.Label(root, text="🧠 Health Tips:", font=label_font).pack()
tips = tk.StringVar()
tk.Label(root, textvariable=tips, font=("Segoe UI", 10), wraplength=360, justify="left").pack(pady=5)

# Button Frame (3 in a row)
btn_frame = tk.Frame(root)
btn_frame.pack(pady=10)

buttons = [
    ("📄 Export to PDF", export_pdf, "#8E44AD"),
    ("📂 View History", show_history, "#2196F3"),
    ("🗑️ Clear History", confirm_clear_history, "#2FE90F"),
    ("🌓 Toggle Theme", toggle_dark_mode, "#3E3E3E"),
    ("🔁 Reset", reset, "#f44336"),
    ("❌ Exit", exit_app, "#6712d0")
]

for i, (text, cmd, color) in enumerate(buttons):
    btn = tk.Button(btn_frame, text=text, command=cmd, bg=color, fg="white", font=label_font, width=18)
    btn.grid(row=i // 3, column=i % 3, padx=5, pady=5)
    button_refs[text] = btn  # for theme restoring

root.mainloop()





