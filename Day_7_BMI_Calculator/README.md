# 🧮 Day 7 – BMI Calculator

## 📝 Description

**Advanced BMI Calculator** is a modern health-tracking tool built with **Python + Tkinter**, offering real-time BMI calculations, health tips, JSON-based history, and even PDF report generation — all wrapped in a sleek GUI.

Whether you're monitoring fitness or exploring Python GUI programming, this tool delivers functionality, modularity, and user-friendliness.

---

## 🚀 Features

- 📏 Height/Weight input with unit conversion (cm/in, kg/lb)  
- 📊 Real-time BMI Calculation + Color-coded Category  
- 💡 Health Tips based on BMI classification  
- 📉 Ideal Weight Range calculator  
- 💾 History stored in JSON with time & category  
- 📂 View history in scrollable popup  
- 📄 Export history to stylized PDF  
- 🗑️ Clear history with confirmation  
- 🌓 Toggle between Light & Dark Mode  
- 📁 Modular Python architecture

---

## 💻 Technologies Used

- **Python 3.x**  
- **Tkinter** – for GUI  
- **JSON** – for local history storage  
- **datetime** – for timestamps  
- **fpdf** – for exporting PDF reports  
- **OS + modular Python** – clean codebase & structure

---

## 🧭 Project Structure

```

Day\_7\_BMI\_Calculator/
├── main.py
└── utils/
├── calculator.py            # BMI + Ideal Weight Logic
├── classification.py       # BMI Category & Color
├── conversions.py          # Unit conversion (cm/in ↔ m, kg/lb ↔ kg)
├── exporter.py             # PDF Exporter using FPDF
├── storage.py              # JSON Save, Read, Clear
└── tips.py                 # Health tips for each BMI range

````

---

## ⚙️ Setup & Usage

1. Clone this folder or repo  
2. Ensure `fpdf` is installed:
```
   pip install fpdf
````

3. Run the app:

```
   python main.py
```


## 📌 Completed on: July 7, 2025

✅ One step closer to building useful real-world Python desktop apps!



