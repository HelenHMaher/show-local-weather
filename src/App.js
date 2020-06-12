import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./Components/location/location";
import Weather from "./Components/weather/weather";
import Footer from "./Components/footer/footer";
import moment from "moment";

function App() {
  const [getMyLocation, setMyLocation] = useState(true);
  const [haveMyLocation, setHaveMyLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState("");
  const [dayNight, setDayNight] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(
    `https://openweathermap.org/img/wn/01n@2x.png`
  );

  function changeImage(input) {
    const idCode = input;
    let code;
    let main;
    switch (true) {
      case idCode < 300:
        code = "11d";
        main = "thunderstorm";
        break;
      case idCode < 400:
        code = "09d";
        main = "drizzle";
        break;
      case idCode < 600:
        code = "10d";
        main = "rain";
        break;
      case idCode < 700:
        code = "13d";
        main = "snow";
        break;
      case idCode < 800:
        code = "50d";
        main = "atmosphere";
        break;
      case idCode === 800:
        code = "01d";
        main = "clear";
        break;
      case idCode === 801:
        code = "02d";
        main = "few clouds";
        break;
      case idCode === 802:
        code = "03d";
        main = "scattered clouds";
        break;
      case idCode < 805:
        code = "04d";
        main = "darker clouds";
        break;
      default:
        code = "01d";
        main = "default";
    }
    console.log(main + " : " + idCode);
    setImage(`https://openweathermap.org/img/wn/${code}@2x.png`);
  }

  function changeDayNight(sunrise, sunset) {
    let currentTime = moment(date).format("X");
    if (currentTime > sunrise && currentTime < sunset) {
      console.log("day");
      setDayNight("day");
    } else {
      console.log("night");
      setDayNight("night");
    }
  }

  //change weather theme
  function changeWeatherTheme(input) {
    setWeatherTheme(input);
    setHaveMyLocation(false);
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
        setDate(new Date());
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
          <div className="mainWeather">
            {weatherTheme}
            <img alt="weather icon" src={image} />
            Current Time: {new Date(date).toGMTString()}
          </div>
          <Weather
            changeWeatherTheme={changeWeatherTheme}
            lat={latitude}
            lon={longitude}
            haveMyLocation={haveMyLocation}
            changeImage={changeImage}
            changeDayNight={changeDayNight}
          />
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
