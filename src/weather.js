import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const Weather = (props) => {
  const { lon, lat } = props;
  const [weather, setWeather] = useState(null);

  function showWeather() {
    axios({
      method: "get",
      url: "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139",
      params: {
        lat: lat,
        lon: lon,
      },
    })
      .then((response) => {
        console.log(response);
        setWeather(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <div>Weather: {weather}</div>;
};

export default Weather;

Weather.propTypes = {
  lon: PropTypes.string,
  lat: PropTypes.string,
};
