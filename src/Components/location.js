import React, { useState } from "react";
import PropTypes from "prop-types";

export const Location = (props) => {
  const {
    lat,
    lon,
    city,
    country,
    getMyLocation,
    clickHandler,
    handleSubmit,
  } = props;

  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

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
        <form className="getLocationForm" onSubmit={handleSubmit}>
          <label htmlFor="cityInput">City: </label>
          <input
            value={cityInput}
            name="cityInput"
            id="cityInput"
            placeholder="city"
            required
            onChange={(e) => setCityInput(e.target.value)}
          />
          <label htmlFor="countryInput">Country: </label>
          <input
            value={countryInput}
            name="countryInput"
            id="countryInput"
            placeholder="country"
            required
            onChange={(e) => setCountryInput(e.target.value)}
          />
          <input type="submit" />
        </form>
        <div className="displayLocation">
          <h1>{cityInput}</h1> <h2>{countryInput}</h2>
        </div>
      </div>
    );
  }
};

export default Location;

Location.propTypes = {
  handleSubmit: PropTypes.func,
  getMyLocation: PropTypes.bool,
  clickHandler: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
};
