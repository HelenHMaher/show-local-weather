import React from "react";
import PropTypes from "prop-types";

export const Weather = (props) => {
  const {
    temp,
    humidity,
    pressure,
    windSpeed,
    cloudCover,
    description,
  } = props;

  return (
    <div className="weather">
      <ul className="weatherData">
        <li>Description: {description}</li>
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
  temp: PropTypes.number,
  humidity: PropTypes.number,
  pressure: PropTypes.number,
  windSpeed: PropTypes.number,
  cloudCover: PropTypes.number,
  description: PropTypes.string,
};
