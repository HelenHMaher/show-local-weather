import React from "react";
import PropTypes from "prop-types";

export const Location = (props) => {
  const { lat, lon, city, country, getMyLocation, clickHandler } = props;

  if (getMyLocation) {
    return (
      <div className="location">
        <button className="getLocation" onClick={clickHandler}>
          Choose a Location
        </button>
        <div className="latAndLon">
          Latitude: {lat} Longitude: {lon}
        </div>
        <div className="city">
          City: {city} Country: {country}
        </div>
      </div>
    );
  } else {
    return (
      <div className="location">
        <button className="getLocation" onClick={clickHandler}>
          Get my Location
        </button>
        <div className="latAndLon">
          Latitude: {lat} Longitude: {lon}
        </div>
        <input className="city" />
      </div>
    );
  }
};

export default Location;

Location.propTypes = {
  getMyLocation: PropTypes.bool,
  clickHandler: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
};
