import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";

export const Weather = (props) => {
  const {
    changeWeatherTheme,
    lat,
    lon,
    haveMyLocation,
    changeDayNight,
    clear,
    setClearData,
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
      <div className="weather">
        <ul className="weatherData">
          <li>Description: {weatherDescript}</li>
          <li>Temperature:{temp} &#176;C</li>
          <li>Humidity: {humidity} &#37;</li>
          <li>Pressure: {pressure} hpa</li>
          <li>Wind Speed: {windSpeed} m/s</li>
          <li>Cloud Cover: {cloudCover} &#37;</li>
          <li>Sunrise: {moment.unix(sunrise).utc().format()} UTC</li>
          <li>Sunset: {moment.unix(sunset).utc().format()} UTC</li>
        </ul>
      </div>
    );
  } else {
    return <div className="loadingWeather">Loading weather data...</div>;
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
};
