import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./location";
import Weather from "./weather";
import axios from "axios";

function App() {
  const [geoLocation, setGeoLocation] = useState("...connecting");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState(null);
  const [weatherDescript, setWeatherDescript] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    function showPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeoLocation(
            `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
          );
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log("location data received");
        });
      } else {
        setGeoLocation(
          "Sorry, your browser does not support HTML5 geolocation."
        );
      }
    }

    showPosition();
  });

  function showWeather() {
    if (!latitude || !longitude) {
      return console.log("waiting for location data");
    }
    axios({
      method: "get",
      url: "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139",
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
      .then((response) => {
        console.log(response);
        setWeather(response.data.main);
        setWeatherTheme(response.data.weather[0].main);
        setWeatherDescript(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    showWeather();
  }, [latitude, longitude]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header className="App-header">
            <p>Local Weather Report</p>
          </header>
          <Location geoLocation={geoLocation} />
          <Weather
            setWeatherDescript={setWeatherDescript}
            setWeatherTheme={setWeatherTheme}
            lon={longitude}
            lat={latitude}
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
