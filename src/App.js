import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./Components/location/location";
import Weather from "./Components/weather/weather";

function App() {
  const [getMyLocation, setMyLocation] = useState(true);
  const [haveMyLocation, setHaveMyLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState(null);

  //change weather theme
  function changeWeatherTheme(input) {
    setWeatherTheme(input);
  }

  //getLatandLon from Location
  function submitLatLon(input) {
    setLatitude(input.geometry.coordinates[1]);
    setLongitude(input.geometry.coordinates[0]);
    setHaveMyLocation(true);
  }

  //toggle getMyLocation from Location
  function submitGetLocation() {
    setMyLocation(!getMyLocation);
    setHaveMyLocation(false);
  }

  //get geolocation data
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
            submitGetLocation={submitGetLocation}
            submitLatLon={submitLatLon}
            haveMyLocation={haveMyLocation}
          />
          <Weather
            changeWeatherTheme={changeWeatherTheme}
            lat={latitude}
            lon={longitude}
            haveMyLocation={haveMyLocation}
          />
          Weather Theme: {weatherTheme}
          <footer className="App-footer">Helen Maher</footer>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
