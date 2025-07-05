Sure! Here's your **`README.md`** file content for **Day 4 – Weather App**. You can copy and save it directly in your `Day4` project folder as `README.md`:

---

````markdown
# 📅 Day 4 – Weather App

## 📝 Description  
This project is a sleek and modern **Weather App** built using **ASP.NET Razor Pages** and the **WeatherAPI**.  
It fetches and displays **current weather**, **3-day forecast**, and a **temperature trend chart**, supporting both **manual city search** and **geolocation-based weather**.  
With added dark mode, charts, and maps — it brings a complete weather dashboard to life!

---

## 🚀 Features

🌤️ Displays current weather with condition and feels-like temperature  
📍 Get weather by **city name** or **current location** (geolocation)  
📈 Shows a **line chart** of 3-day average temperature using Chart.js  
🌡️ Includes max/min temp, humidity, wind speed & direction  
🕶️ **UV Index**, 🌧️ **Rain Chance**, 📊 **Pressure**, and 🌙 **Moon Phase**  
🌅 Sunrise and 🌇 Sunset timings  
🗺️ Embedded **OpenStreetMap** showing current location  
🌗 **Dark/Light mode toggle** with theme persistence  
⚠️ Robust error handling and loading spinners  

---

## 💻 Technologies Used

- ASP.NET Razor Pages (.NET 7)  
- C#  
- WeatherAPI.com  
- JavaScript (Vanilla)  
- HTML5 + CSS3  
- Chart.js  
- Leaflet.js (for map)

---

## 📂 How It Works

1. User enters a **city** or clicks the 📍 button to use geolocation.  
2. App fetches data from **WeatherAPI.com** (forecast + current).  
3. It extracts and displays:
   - Weather summary (temp, humidity, pressure, etc.)
   - 3-day forecast cards with icons
   - Chart showing average temperature trend
   - A map showing the queried location  
4. Toggle 🌗 **dark/light theme**, and theme persists after refresh.

---

## ⚙️ Setup & Usage

1. Open the `Day4` folder in **Visual Studio**  
2. Add your **API key** to `appsettings.json`:

```json
"WeatherApi": {
  "ApiKey": "your_api_key_here"
}
````

3. Run the project using `Ctrl + F5` or via IIS Express
4. Search for a city or click 📍 to get weather

---

## 🌐 Example Output

```
📍 Hyderabad
🌤️ Partly cloudy 🌡️ 27.4°C (Feels like: 28.3°C)
💧 Humidity: 62% | 🌬️ Wind: 35.6 m/s (W)
📊 Pressure: 1012 hPa | ☀️ UV Index: 5.6
🌧️ Rain Chance: 89%
🌅 Sunrise: 05:58 AM | 🌇 Sunset: 06:50 PM
📈 Line Chart of 3-Day Temp
🗺️ Location map
```

---

## 📌 Completed on: July 4, 2025

✅ This project was a perfect opportunity to work with **external APIs**, **JSON parsing**, **charting libraries**, **geolocation APIs**, and enhance frontend polish with **theme toggle** and **responsive design**!

---
