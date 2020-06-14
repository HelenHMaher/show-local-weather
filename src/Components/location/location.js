import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getCountryName from "./countryCode";
import { StyledLocation } from "./location.styled";

export const Location = (props) => {
  const {
    lat,
    lon,
    getMyLocation,
    submitGetLocation,
    submitLatLon,
    haveMyLocation,
    getCountryCode,
    clearData,
  } = props;

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempCountry, setTempCountry] = useState("");
  const [tempPostalCode, setTempPostalCode] = useState("");
  const [placeName, setPlaceName] = useState("");

  const STATUS = "";

  function clearPlaceName() {
    setPlaceName("");
    submitGetLocation();
  }

  function getNewCountry(code, country) {
    getCountryCode(code, country);
    setCountry(country);
  }

  function showCity() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/https://nominatim.openstreetmap.org/reverse",
      params: {
        lat: lat,
        lon: lon,
        format: "json",
        //zoom: "14",
      },
    })
      .then((response) => {
        setCity(response.data.address.borough);
        setCountry(response.data.address.country);
        getCountryCode(
          response.data.address.country_code,
          response.data.address.country
        );
        //console.log(response);
        console.log("reverse Geolocation");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    clearData();
    setCity("");
    setCountry("");
    setPlaceName("");

    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/https://nominatim.openstreetmap.org/search",
      params: tempPostalCode
        ? {
            country: tempCountry,
            postalcode: tempPostalCode,
            format: "geojson",
          }
        : tempCity
        ? { country: tempCountry, city: tempCity, format: "geojson" }
        : { country: tempCountry, format: "geojson" },
    })
      .then((response) => {
        if (response.data.features.length >= 1) {
          console.log("geolocation");
          getCountryName(tempCountry, getNewCountry);
          setCity(tempCity.toUpperCase());
          setTempCity("");
          setTempCountry("");
          setTempPostalCode("");
          console.log(response);
          submitLatLon(response.data.features[0]);
          setPlaceName(response.data.features[0].properties.display_name);
        } else {
          setPlaceName("ERROR: location data not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (getMyLocation && haveMyLocation && STATUS !== "development") {
      showCity();
    }
  }, [haveMyLocation]);

  if (getMyLocation) {
    return (
      <StyledLocation placeName={placeName} country={country}>
        <div className="displayLocation">
          <h2>
            {city}, {country}
          </h2>
        </div>
        <div className="locationDetails">
          <ul>
            <li>
              <span className="label">Latitude </span>
              {lat}
            </li>
            <li>
              <span className="label">Longitude </span>
              {lon}
            </li>
          </ul>
        </div>
        <button className="getLocation" onClick={submitGetLocation}>
          Choose a Location
        </button>
      </StyledLocation>
    );
  } else {
    return (
      <StyledLocation placeName={placeName} country={country}>
        <form className="getLocationForm" onSubmit={handleSubmit}>
          <div className="inputSet">
            <label htmlFor="countryInput">Country </label>
            <input
              value={tempCountry}
              name="countryInput"
              className="input"
              placeholder="country**"
              required
              onChange={(e) => setTempCountry(e.target.value)}
            />
            <br />
          </div>
          <div className="inputSet">
            <label htmlFor="cityInput">City </label>
            <input
              value={tempCity}
              name="cityInput"
              className="input"
              placeholder="city"
              onChange={(e) => setTempCity(e.target.value)}
            />
            <br />
          </div>
          <div className="inputSet">
            <label htmlFor="countryInput">Postal Code </label>
            <input
              value={tempPostalCode}
              name="postalCodeInput"
              className="input"
              placeholder="postal code"
              onChange={(e) => setTempPostalCode(e.target.value)}
            />
            <br />
          </div>
          <div className="inputSet">
            <input id="submit" type="submit" />
            <button className="getLocation" onClick={clearPlaceName}>
              Get my Location
            </button>
          </div>
        </form>

        <div className="displayLocation">
          <h2>{placeName}</h2>
        </div>
        <div className="locationDetails">
          <ul>
            <li>
              <span className="label">Latitude </span>
              {lat}
            </li>
            <li>
              <span className="label">Longitude </span>
              {lon}
            </li>
          </ul>
        </div>
      </StyledLocation>
    );
  }
};

export default Location;

Location.propTypes = {
  submitLatLon: PropTypes.func,
  getMyLocation: PropTypes.bool,
  submitGetLocation: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  haveMyLocation: PropTypes.bool,
  getCountryCode: PropTypes.func,
  clearData: PropTypes.func,
};
