import React, { useState, useEffect, useCallback } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./Components/location";
import Weather from "./Components/weather";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState(null);
  const [weatherDescript, setWeatherDescript] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  function showPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const result = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        //console.log(result);
        setLatitude(result.lat);
        setLongitude(result.lon);
        showCity(result);
        showWeather(result);
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }

  function showCity(coordinates) {
    axios({
      method: "get",
      url: "https://nominatim.openstreetmap.org/reverse?",
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        format: "json",
      },
    })
      .then((response) => {
        setCity(response.data.address.borough);
        setCountry(response.data.address.country);
        console.log(response);
        console.log("reverseGeolocation");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showWeather(coordinates) {
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://fcc-weather-api.glitch.me/api/current",
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
      },
    })
      .then((response) => {
        console.log("cors proxy weather data");
        console.log(response.data);
        setTemp(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWindSpeed(response.data.wind.speed);
        setCloudCover(response.data.clouds.all);
        setWeatherTheme(response.data.weather[0].main);
        setWeatherDescript(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    showPosition();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header className="App-header">
            <p>Local Weather Report</p>
          </header>
          <Location
            lat={latitude}
            lon={longitude}
            city={city}
            country={country}
          />
          <Weather
            temp={temp}
            humidity={humidity}
            pressure={pressure}
            windSpeed={windSpeed}
            cloudCover={cloudCover}
          />
          Weather Theme: {weatherTheme}
          Weather Description: {weatherDescript}
          <footer className="App-footer">Helen Maher</footer>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
