import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const Weather = (props) => {
  const { changeWeatherTheme, lat, lon, haveMyLocation, changeImage } = props;

  const [weatherDescript, setWeatherDescript] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);

  const STATUS = "development";

  /*//FCC gets Weather Data from http://api.openweathermap.org waiting for API KEY to be activated
  function showWeather() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.API_KEY,
      },
    })
      .then((response) => {
        console.log("weather data");

        setTemp(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWindSpeed(response.data.wind.speed);
        setCloudCover(response.data.clouds.all);
        setWeatherDescript(response.data.weather[0].description);

        changeWeatherTheme(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  }*/

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

        setTemp(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWindSpeed(response.data.wind.speed);
        setCloudCover(response.data.clouds.all);
        setWeatherDescript(response.data.weather[0].description);

        changeImage(response.data.weather[0].id);
        changeWeatherTheme(response.data.weather[0].main);
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
        <li>Temperature:{temp}</li>
        <li>Humidity: {humidity}</li>
        <li>Pressure: {pressure}</li>
        <li>Wind Speed: {windSpeed}</li>
        <li>Cloud Cover: {cloudCover}</li>
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
};
