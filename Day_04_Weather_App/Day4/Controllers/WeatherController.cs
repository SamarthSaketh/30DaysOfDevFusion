using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Day4.Models;

namespace Day4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _http;

        public WeatherController(IConfiguration config)
        {
            _config = config;
            _http = new HttpClient();
        }

        [HttpGet("forecast")]
        public async Task<IActionResult> GetWeather(string city = "", double? lat = null, double? lon = null)
        {
            try
            {
                if (string.IsNullOrEmpty(city) && (!lat.HasValue || !lon.HasValue))
                    return BadRequest("City or coordinates are required.");

                var apiKey = _config["WeatherApi:ApiKey"];
                var location = !string.IsNullOrEmpty(city) ? city : $"{lat},{lon}";
                var url = $"http://api.weatherapi.com/v1/forecast.json?key={apiKey}&q={location}&days=3&aqi=no&alerts=no";

                var res = await _http.GetStringAsync(url);
                var data = JObject.Parse(res);

                var current = data["current"];
                var locationData = data["location"];
                var forecastDays = data["forecast"]["forecastday"];

                var today = forecastDays[0]["day"];
                var astro = forecastDays[0]["astro"];

                var vm = new WeatherViewModel
                {
                    City = locationData["name"].ToString(),
                    Description = current["condition"]["text"].ToString(),
                    Temperature = current["temp_c"].ToString(),
                    FeelsLike = current["feelslike_c"].ToString(),
                    Humidity = current["humidity"].ToString(),
                    WindSpeed = current["wind_kph"].ToString(),
                    WindDirection = DegreesToCardinal((int?)current["wind_degree"] ?? 0),
                    Pressure = current["pressure_mb"].ToString(),
                    UVIndex = current["uv"].ToString(),
                    Icon = current["condition"]["icon"].ToString(),
                    Latitude = locationData["lat"].Value<double>(),
                    Longitude = locationData["lon"].Value<double>(),
                    Sunrise = astro["sunrise"].ToString(),
                    Sunset = astro["sunset"].ToString(),
                    RainChance = $"{today["daily_chance_of_rain"]?.ToString() ?? "0"}%",
                    MaxTemp = today["maxtemp_c"].ToString(),
                    MinTemp = today["mintemp_c"].ToString(),
                    Forecast = new List<ForecastItem>()
                };

                foreach (var day in forecastDays)
                {
                    var date = DateTime.Parse(day["date"].ToString());

                    vm.Forecast.Add(new ForecastItem
                    {
                        Day = date.ToString("dddd"),
                        Temp = day["day"]["avgtemp_c"].ToString(),
                        Icon = day["day"]["condition"]["icon"].ToString(),
                        Description = day["day"]["condition"]["text"].ToString(),
                        MoonPhase = day["astro"]["moon_phase"]?.ToString() ?? "Unknown"
                    });
                }

                return Ok(vm);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // 🔄 Wind direction conversion (degrees to cardinal)
        private string DegreesToCardinal(int degrees)
        {
            string[] directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N" };
            return directions[(int)Math.Round((double)degrees % 360 / 45)];
        }
    }
}
