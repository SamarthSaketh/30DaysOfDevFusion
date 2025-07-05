async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) return alert("Please enter a city.");

    console.log("Fetching weather for:", city);
    document.getElementById("weather").innerHTML = `<div class="spinner"></div>`;

    try {
        const response = await fetch(`/api/weather/forecast?city=${encodeURIComponent(city)}`);
        const text = await response.text();
        console.log("Response Text:", text);

        if (!response.ok) throw new Error(text);

        const data = JSON.parse(text);
        renderWeather(data);
    } catch (err) {
        document.getElementById("weather").innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
    }
}

async function getLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    document.getElementById("weather").innerHTML = `<p>Getting location...</p>`;

    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
            const response = await fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`);
            const text = await response.text();
            console.log("Geo Response Text:", text);

            if (!response.ok) throw new Error(text);

            const data = JSON.parse(text);
            renderWeather(data);
        } catch (err) {
            document.getElementById("weather").innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
        }
    }, () => {
        alert("Location access denied.");
    });
}

function renderWeather(data) {
    const weatherDiv = document.getElementById("weather");

    const forecastHTML = data.forecast.map(f => `
        <div class="card">
            <h4>${f.day}</h4>
            <img src="https:${f.icon}" alt="${f.description}" />
            <p>${f.temp}°C</p>
            <small>${f.description}</small><br/>
            <small>🌙 ${f.moonPhase}</small>
        </div>
    `).join("");

    weatherDiv.innerHTML = `
    <h2>${data.city}</h2>

    <div class="summary-grid">
        <div class="summary-item">
            <strong>🌤️ ${data.description}</strong><br>
            Temp: ${data.temperature}°C<br>
            Feels like: ${data.feelsLike}°C
        </div>
        <div class="summary-item">
            <strong>🌡️ Max/Min</strong><br>
            ${data.maxTemp}°C / ${data.minTemp}°C
        </div>
        <div class="summary-item">
            <strong>💧 Humidity</strong><br>
            ${data.humidity}%
        </div>
        <div class="summary-item">
            <strong>🌬️ Wind</strong><br>
            ${data.windSpeed} m/s (${data.windDirection})
        </div>
        <div class="summary-item">
            <strong>📊 Pressure</strong><br>
            ${data.pressure} hPa
        </div>
        <div class="summary-item">
            <strong>☀️ UV Index</strong><br>
            ${data.uvIndex}
        </div>
        <div class="summary-item">
            <strong>🌧️ Rain Chance</strong><br>
            ${data.rainChance}
        </div>
        <div class="summary-item">
            <strong>🌅 Sunrise</strong><br>
            ${data.sunrise}
        </div>
        <div class="summary-item">
            <strong>🌇 Sunset</strong><br>
            ${data.sunset}
        </div>
        <div class="summary-item">
            <strong>📍 Location</strong><br>
            Lat: ${data.latitude}, Lon: ${data.longitude}
        </div>
    </div>

    <h3>3-Day Forecast:</h3>
    <div class="forecast">${forecastHTML}</div>

    <canvas id="weatherChart" width="600" height="300"></canvas>
    <div id="map" style="height: 300px; margin-top: 20px;"></div>
`;


    renderChart(data.forecast);
    renderMap(data.latitude, data.longitude, data.city);
}

function renderChart(forecast) {
    const labels = forecast.map(f => f.day);
    const temps = forecast.map(f => parseFloat(f.temp));

    const ctx = document.getElementById("weatherChart").getContext("2d");

    if (window.weatherChart instanceof Chart) {
        window.weatherChart.destroy();
    }

    window.weatherChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Avg Temp (°C)",
                data: temps,
                borderColor: "blue",
                backgroundColor: "rgba(135,206,250,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: {
                    display: true,
                    text: "3-Day Temperature Trend"
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function renderMap(lat, lon, city) {
    const mapDiv = document.getElementById("map");

    // Prevent duplicate maps
    if (mapDiv._leaflet_id) {
        mapDiv._leaflet_id = null;
        mapDiv.innerHTML = "";
    }

    const map = L.map("map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(`${city}`).openPopup();
}

function handleEnter(e) {
    if (e.key === "Enter") getWeather();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});
