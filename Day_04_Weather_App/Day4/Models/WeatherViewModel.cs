namespace Day4.Models
{
    public class WeatherViewModel
    {
        public string City { get; set; }
        public string Description { get; set; }
        public string Temperature { get; set; }
        public string FeelsLike { get; set; }        // NEW
        public string Humidity { get; set; }
        public string WindSpeed { get; set; }
        public string WindDirection { get; set; }
        public string RainChance { get; set; }
        public string Pressure { get; set; }         // NEW
        public string UVIndex { get; set; }          // NEW
        public string Icon { get; set; }
        public string Sunrise { get; set; }
        public string Sunset { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<ForecastItem> Forecast { get; set; }
        public string MaxTemp { get; set; }          // NEW
        public string MinTemp { get; set; }          // NEW
    }

    public class ForecastItem
    {
        public string Day { get; set; }
        public string Temp { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public string MoonPhase { get; set; }        // NEW
    }
}
