import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { MainDisplayStyled } from "./mainDisplay.styled";

export const MainDisplay = (props) => {
  const { weatherTheme, image, date, timeZone, dayNight } = props;
  if (dayNight) {
    return (
      <MainDisplayStyled className="mainWeather">
        <div className="weather">
          <img alt="weather icon" src={image} />
          <div className="weatherTheme">{weatherTheme}</div>
          <div className="dayNight">({dayNight.toUpperCase()})</div>
        </div>
        <div className="time">
          {moment
            .unix(date + timeZone * 60 * 60)
            .utc()
            .format("dddd, MMMM Do YYYY, h:mm a")}
        </div>
      </MainDisplayStyled>
    );
  } else {
    return <MainDisplayStyled>{dayNight}</MainDisplayStyled>;
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
