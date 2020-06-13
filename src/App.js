import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Location from "./Components/location/location";
import Weather from "./Components/weather/weather";
import Footer from "./Components/footer/footer";
import MainDisplay from "./Components/mainDisplay/mainDisplay";
import axios from "axios";
import moment from "moment";

function App() {
  const [getMyLocation, setMyLocation] = useState(true);
  const [haveMyLocation, setHaveMyLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState("");
  const [dayNight, setDayNight] = useState("");
  const [timeZone, setTimeZone] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(
    `https://openweathermap.org/img/wn/01n@2x.png`
  );

  function changeImage(img, timeOfDay) {
    const idCode = img;
    let code;
    let main;
    switch (true) {
      case idCode < 300:
        code = "11";
        main = "thunderstorm";
        break;
      case idCode < 400:
        code = "09";
        main = "drizzle";
        break;
      case idCode < 600:
        code = "10";
        main = "rain";
        break;
      case idCode < 700:
        code = "13";
        main = "snow";
        break;
      case idCode < 800:
        code = "50";
        main = "atmosphere";
        break;
      case idCode === 800:
        code = "01";
        main = "clear";
        break;
      case idCode === 801:
        code = "02";
        main = "few clouds";
        break;
      case idCode === 802:
        code = "03";
        main = "scattered clouds";
        break;
      case idCode < 805:
        code = "04";
        main = "darker clouds";
        break;
      default:
        code = "01";
        main = "default";
    }
    //console.log("daynight: " + timeOfDay);
    timeOfDay === "day" || timeOfDay === "dawn"
      ? (code = code + "d")
      : (code = code + "n");
    console.log(main + " : " + idCode + " : " + code);
    setImage(`https://openweathermap.org/img/wn/${code}@2x.png`);
  }

  function changeDayNight(sunrise, sunset, img, dateTime) {
    let date = moment(dateTime);
    date = parseInt(date.format("X"));

    const dawn = sunrise + 60 * 60;
    const dusk = sunset + 60 * 60;
    console.log(
      "dawn: " +
        dawn +
        " sunrise: " +
        sunrise +
        " img: " +
        img +
        " date: " +
        date
    );
    let timeOfDay;
    if (date > sunrise && date < dawn) {
      timeOfDay = "dawn";
    } else if (date > dawn && date < sunset) {
      timeOfDay = "day";
    } else if (date > sunset && date < dusk) {
      timeOfDay = "dusk";
    } else if (date > dusk) {
      timeOfDay = "night";
    }
    console.log(timeOfDay);
    setDayNight(timeOfDay);
    setDate(date);
    changeImage(img, timeOfDay);
  }

  //IS MY CORS PROXY STRIPPING THE API KEY OUT OF MY REQUEST???
  //set time zone
  function getTimeZone(lat, lon) {
    axios({
      method: "get",
      url: "https://api.ipgeolocation.io/timezone",
      params: {
        lat: lat,
        long: lon,
        apiKey: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        const offset = response.data.timezone_offset;
        setTimeZone(offset);
        console.log("time zone: " + offset);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //change weather theme
  function changeWeatherTheme(input) {
    setWeatherTheme(input);
    setHaveMyLocation(false);
  }

  //getLatandLon from Location
  function submitLatLon(input) {
    const coordinates = input.geometry.coordinates;
    setLatitude(coordinates[1]);
    setLongitude(coordinates[0]);
    getTimeZone(coordinates[1], coordinates[0]);
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
        getTimeZone(result.lat, result.lon);
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
            date={date}
          />

          <MainDisplay
            weatherTheme={weatherTheme}
            date={date}
            image={image}
            timeZone={timeZone}
            dayNight={dayNight}
          />

          <Weather
            changeWeatherTheme={changeWeatherTheme}
            lat={latitude}
            lon={longitude}
            haveMyLocation={haveMyLocation}
            changeDayNight={changeDayNight}
          />
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
