import React from "react";
import PropTypes from "prop-types";

export const Location = (props) => {
  const { lat, lon } = props;
  return (
    <div className="location">
      <div className="latAndLon">
        Latitude: {lat} Longitude: {lon}
      </div>
      <div className="city">City:</div>
    </div>
  );
};

export default Location;

Location.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
};
