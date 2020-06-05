import React from "react";
import PropTypes from "prop-types";

export const Weather = (props) => {
  const { weather } = props;

  return <div className="weather">Weather:{weather}</div>;
};

export default Weather;

Weather.propTypes = {
  weather: PropTypes.number,
};
