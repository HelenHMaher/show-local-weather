import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./location";

function App() {
  const [geoLocation, setGeoLocation] = useState(
    "Sorry, your browser does not support HTML5 geolocation"
  );

  useEffect(() => {
    function showPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeoLocation(
            `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
          );
        });
      } else {
        setGeoLocation(
          "Sorry, your browser does not support HTML5 geolocation"
        );
      }
    }
    showPosition();
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header className="App-header">
            <p>Local Weather Report</p>
          </header>
          <Location geoLocation={geoLocation} />
          <div className="weather">Weather:</div>
          <footer className="App-footer">Helen Maher</footer>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
