import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Weather = (props) => {
  const { lon, lat, setWeatherTheme, setWeatherDescript } = props;

  return <div className="weather">Weather:</div>;
};

export default Weather;

Weather.propTypes = {
  setWeatherTheme: PropTypes.func.isRequired,
  setWeatherDescript: PropTypes.func.isRequired,
  lon: PropTypes.number,
  lat: PropTypes.number,
};
