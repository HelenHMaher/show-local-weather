import React from "react";
import PropTypes from "prop-types";

export const Location = (props) => {
  const { geoLocation } = props;
  return <div>Location: {geoLocation}</div>;
};

export default Location;

Location.propTypes = {
  geoLocation: PropTypes.string.isRequired,
};
