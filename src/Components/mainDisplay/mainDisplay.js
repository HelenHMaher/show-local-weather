import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const MainDisplay = (props) => {
  const { weatherTheme, image, date, timeZone, dayNight } = props;

  if (dayNight.lenght > 0) {
    return (
      <div className="mainWeather">
        {dayNight}
        {weatherTheme}
        <img alt="weather icon" src={image} />
        {moment.unix(date).utc().format()}
        Local Time Zone: {timeZone}
      </div>
    );
  } else {
    return <div>{dayNight}</div>;
  }
};

export default MainDisplay;

MainDisplay.propTypes = {
  weatherTheme: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.number,
  timeZone: PropTypes.number,
  dayNight: PropTypes.string,
};
