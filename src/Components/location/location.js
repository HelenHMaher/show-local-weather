import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const Location = (props) => {
  const {
    lat,
    lon,
    getMyLocation,
    submitGetLocation,
    submitLatLon,
    haveMyLocation,
  } = props;

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempCountry, setTempCountry] = useState("");
  const [placeName, setPlaceName] = useState("");

  const STATUS = "development";

  function showCity() {
    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/https://nominatim.openstreetmap.org/reverse",
      params: {
        lat: lat,
        lon: lon,
        format: "json",
        zoom: "14",
      },
    })
      .then((response) => {
        setCity(response.data.address.borough);
        setCountry(response.data.address.country);
        //console.log(response);
        console.log("reverse Geolocation");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios({
      method: "get",
      url:
        "https://cors-anywhere-hhm.herokuapp.com/https://nominatim.openstreetmap.org/search",
      params: {
        country: tempCountry,
        city: tempCity,
        format: "geojson",
      },
    })
      .then((response) => {
        console.log("geolocation");
        setCity(tempCity);
        setCountry(tempCountry);
        setTempCity("");
        setTempCountry("");
        if (response.data.features.length >= 1) {
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
      <div className="location">
        <button className="getLocation" onClick={submitGetLocation}>
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
        <button className="getLocation" onClick={submitGetLocation}>
          Get my Location
        </button>
        <div className="latAndLon">
          Latitude: {lat} Longitude: {lon}
        </div>
        <form className="getLocationForm" onSubmit={handleSubmit}>
          <label htmlFor="cityInput">City: </label>
          <input
            value={tempCity}
            name="cityInput"
            id="cityInput"
            placeholder="city"
            required
            onChange={(e) => setTempCity(e.target.value)}
          />
          <label htmlFor="countryInput">Country: </label>
          <input
            value={tempCountry}
            name="countryInput"
            id="countryInput"
            placeholder="country"
            required
            onChange={(e) => setTempCountry(e.target.value)}
          />
          <input type="submit" />
        </form>
        <div className="displayLocation">
          <div id="inputed name">
            <h1>{city}</h1> <h2>{country}</h2>
          </div>
          <h5>{placeName}</h5>
        </div>
      </div>
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
};
