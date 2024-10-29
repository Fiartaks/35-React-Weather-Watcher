import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=3&aqi=yes&alerts=yes`
        );

        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Hava Nasıl Orda?</h1>
        <div className="input-container">
          <input
            className="location-input"
            type="text"
            placeholder="Sehir Giriniz"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
          <div key={day.date} className="day-container">
            <h2 className="date">{day.date}</h2>
            <img className="weather-icon" src={day.day.condition.icon} alt={day.day.condition.text} />
            <p className="temperature">{day.day.avgtemp_c} C</p>
            <p className="temperature">{day.day.condition.text}</p>

          </div>


          ))}
        </div>
      )}

       

    </>
  );
}

export default App;
