import React, { useState, useEffect } from "react";
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
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  //google api requires payment: look up "https://nominatim.org/release-docs/develop/api/Reverse/" for alt api

  function showPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("location data received");
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }

  function showCity() {
    //const YOUR_API_KEY = process.env.API_KEY;
    axios({
      method: "get",
      url: "https://nominatim.openstreetmap.org/reverse?",
      params: {
        lat: latitude,
        lon: longitude,
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

  function showWeather() {
    axios({
      method: "get",
      url: "https://fcc-weather-api.glitch.me/api/current",
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
      .then((response) => {
        console.log(response);
        setWeather(response.data.main.temp);
        setWeatherTheme(response.data.weather[0].main);
        setWeatherDescript(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    showPosition();
    showWeather();
    showCity();
  });

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
          <Weather weather={weather} />
          Weather Theme: {weatherTheme}
          Weather Description: {weatherDescript}
          <footer className="App-footer">Helen Maher</footer>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
