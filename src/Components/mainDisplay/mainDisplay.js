import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const MainDisplay = (props) => {
  const { weatherTheme, image, date, timeZone, dayNight } = props;

  return (
    <div className="mainWeather">
      {dayNight}
      {weatherTheme}
      <img alt="weather icon" src={image} />
      {moment.unix(date).utc().format()}
      Local Time Zone: {timeZone}
    </div>
  );
};

export default MainDisplay;

MainDisplay.propTypes = {
  weatherTheme: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.number,
  timeZone: PropTypes.number,
  dayNight: PropTypes.string,
};
