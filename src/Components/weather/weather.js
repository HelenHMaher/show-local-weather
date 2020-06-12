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
    changeImage,
    changeDayNight,
  } = props;

  const [weatherDescript, setWeatherDescript] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const STATUS = "";

  /*//FCC gets Weather Data from http://api.openweathermap.org waiting for API KEY to be activated
  function showWeather() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        units: metric,
        appid: process.env.API_KEY,
      },
    })
      .then((response) => {
        console.log("weather data");
        const data = response.data;

        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
        setWindSpeed(data.wind.speed);
        setCloudCover(data.clouds.all);
        setWeatherDescript(data.weather[0].description);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);

        changeImage(data.weather[0].id);
        changeWeatherTheme(data.weather[0].main);
        changeDayNight(data.sys.sunrise, data.sys.sunset);
      })
      .catch((error) => {
        console.log(error);
      });
  }*/

  //fcc makes the call in metric
  function showWeather() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/https://fcc-weather-api.glitch.me/api/current",
      params: {
        lat: lat,
        lon: lon,
      },
    })
      .then((response) => {
        console.log("weather data");
        const data = response.data;

        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
        setWindSpeed(data.wind.speed);
        setCloudCover(data.clouds.all);
        setWeatherDescript(data.weather[0].description);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);

        changeImage(data.weather[0].id);
        changeWeatherTheme(data.weather[0].main);
        changeDayNight(data.sys.sunrise, data.sys.sunset);
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

  return (
    <div className="weather">
      <ul className="weatherData">
        <li>Description: {weatherDescript}</li>
        <li>Temperature:{temp} &#176;C</li>
        <li>Humidity: {humidity} &#37;</li>
        <li>Pressure: {pressure} hpa</li>
        <li>Wind Speed: {windSpeed} m/s</li>
        <li>Cloud Cover: {cloudCover} &#37;</li>
        <li>Sunrise: {moment.unix(sunrise).utc().format("HH:mm:ss")} UTC</li>
        <li>Sunset: {moment.unix(sunset).utc().format("HH:mm:ss")} UTC</li>
      </ul>
    </div>
  );
};

export default Weather;

Weather.propTypes = {
  changeWeatherTheme: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  haveMyLocation: PropTypes.bool,
  changeImage: PropTypes.func,
  changeDayNight: PropTypes.func,
};
