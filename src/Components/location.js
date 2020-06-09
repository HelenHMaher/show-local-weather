import React from "react";
import PropTypes from "prop-types";

export const Location = (props) => {
  const { lat, lon, city, country } = props;
  return (
    <div className="location">
      <div className="latAndLon">
        Latitude: {lat} Longitude: {lon}
      </div>
      <div className="city">
        City: {city} Country: {country}
      </div>
    </div>
  );
};

export default Location;

Location.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
};
