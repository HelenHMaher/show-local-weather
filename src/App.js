import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./Components/location/location";
import Weather from "./Components/weather/weather";
import axios from "axios";

function App() {
  const [getMyLocation, setMyLocation] = useState(true);
  const [haveMyLocation, setHaveMyLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState(null);

  const [weatherDescript, setWeatherDescript] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);

  //getLatandLon from Location
  function submitLatLon(input) {
    setLatitude(input.geometry.coordinates[1]);
    setLongitude(input.geometry.coordinates[0]);
  }

  //toggle getMyLocation from Location
  function clickHandler() {
    setMyLocation(!getMyLocation);
    setHaveMyLocation(false);
  }

  function showPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const result = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLatitude(result.lat);
        setLongitude(result.lon);
        console.log("location data");
        setHaveMyLocation(true);
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }

  /*
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
        console.log("weather data");
        //console.log(response.data);
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
*/

  useEffect(() => {
    if (getMyLocation) {
      showPosition();
    }
  }, [getMyLocation]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header className="App-header">
            <p>Local Weather Report</p>
          </header>
          <Location
            getMyLocation={getMyLocation}
            lat={latitude}
            lon={longitude}
            clickHandler={clickHandler}
            submitLatLon={submitLatLon}
            haveMyLocation={haveMyLocation}
          />
          <Weather
            temp={temp}
            humidity={humidity}
            pressure={pressure}
            windSpeed={windSpeed}
            cloudCover={cloudCover}
            description={weatherDescript}
          />
          Weather Theme: {weatherTheme}
          <footer className="App-footer">Helen Maher</footer>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
