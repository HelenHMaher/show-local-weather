import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { abbFromStateName } from "./stateAbbr";

export const CovidUS = (props) => {
  const { placeName, addressObject, countryCode } = props;

  const [covidUSData, setCovidUSData] = useState({});

  function getState(placeName, addressObject) {
    const stateAbbreviation = addressObject
      ? abbFromStateName(addressObject.state)
      : abbFromStateName(placeName.split(", ")[2]);
    covidData(stateAbbreviation);
  }

  function covidData(stateAbbreviation) {
    axios({
      method: "get",
      url: `https://cors-anywhere-hhm.herokuapp.com/https://coronavirusapi.com/getTimeSeries/${stateAbbreviation}`,
    })
      .then((response) => {
        let data = response.data;
        setCovidUSData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (countryCode === "US") getState(placeName, addressObject);
  }, [countryCode]);

  return (
    <div>
      <ul className="latestCovid">
        <li>Updated: </li>
        <li>tested: </li>
        <li>positive: </li>
        <li>deaths: </li>
      </ul>
      <ul className="previousCovid">
        <li>Updated: </li>
        <li>tested: </li>
        <li>positive: </li>
        <li>deaths: </li>
      </ul>
    </div>
  );
};

export default CovidUS;

CovidUS.propTypes = {
  placeName: PropTypes.string,
  addressObject: PropTypes.object,
  countryCode: PropTypes.string,
};
