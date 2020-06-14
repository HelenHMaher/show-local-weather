import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { StyledWeather } from "./weather.styled";

export const Weather = (props) => {
  const {
    changeWeatherTheme,
    lat,
    lon,
    haveMyLocation,
    changeDayNight,
    clear,
    setClearData,
    timeZone,
  } = props;

  const [weatherDescript, setWeatherDescript] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const STATUS = "";

  function showWeather() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        units: "metric",
        appid: "9761974d8e7e1a1d192323f66e2d03d9",
      },
    })
      .then((response) => {
        console.log("weather data");
        const data = response.data;
        const dateTime = response.headers.date;

        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
        setWindSpeed(data.wind.speed);
        setCloudCover(data.clouds.all);
        setWeatherDescript(data.weather[0].description);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);

        changeDayNight(
          data.sys.sunrise,
          data.sys.sunset,
          data.weather[0].id,
          dateTime
        );
        changeWeatherTheme(data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (haveMyLocation && STATUS !== "development") {
      showWeather();
    }
  }, [haveMyLocation]);

  useEffect(() => {
    if (clear) {
      setClearData();
      setTemp(null);
      setHumidity(null);
      setPressure(null);
      setWindSpeed(null);
      setCloudCover(null);
      setWeatherDescript("");
      setSunrise(null);
      setSunset(null);
    }
  }, [clear]);

  if (weatherDescript.length > 0) {
    return (
      <StyledWeather className="weather">
        <ul className="weatherData">
          <li>
            <span className="label">Description</span> {weatherDescript}
          </li>
          <li>
            <span className="label">Temperature</span> {temp} &#176;C
          </li>
          <li>
            <span className="label">Humidity</span> {humidity} &#37;
          </li>
          <li>
            <span className="label">Pressure</span> {pressure} hpa
          </li>
          <li>
            <span className="label">Wind Speed</span> {windSpeed} m/s
          </li>
          <li>
            <span className="label">Cloud Cover</span> {cloudCover} &#37;
          </li>
          <li>
            <span className="label">Sunrise</span>{" "}
            {moment
              .unix(sunrise + timeZone * 60 * 60)
              .utc()
              .format("HH:mm")}{" "}
            (local time)
          </li>
          <li>
            <span className="label">Sunset</span>{" "}
            {moment
              .unix(sunset + timeZone * 60 * 60)
              .utc()
              .format("HH:mm")}{" "}
            (local time)
          </li>
        </ul>
      </StyledWeather>
    );
  } else {
    return (
      <StyledWeather className="loadingWeather">
        Loading weather data...
      </StyledWeather>
    );
  }
};

export default Weather;

Weather.propTypes = {
  changeWeatherTheme: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  haveMyLocation: PropTypes.bool,
  changeDayNight: PropTypes.func,
  clear: PropTypes.bool,
  setClearData: PropTypes.func,
  timeZone: PropTypes.number,
};
