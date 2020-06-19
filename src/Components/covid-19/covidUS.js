import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { abbFromStateName } from "./stateAbbr";

export const CovidUS = (props) => {
  const { stateName, addressObject, countryCode, showCovid } = props;

  const [covidCurrent, setCovidCurrent] = useState({});
  const [covidPrevious, setCovidPrevious] = useState({});
  const [finalStateName, setFinalStateName] = useState("");

  function getFinalState(stateName, addressObject) {
    let stateAbbreviation;
    if (addressObject) {
      stateAbbreviation = abbFromStateName(addressObject.state);
      setFinalStateName(addressObject.state);
    } else {
      stateAbbreviation = abbFromStateName(stateName);
      setFinalStateName(stateName);
    }
    covidData(stateAbbreviation);
  }

  function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(",");
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(",");
      if (data.length === headers.length) {
        var tarr = [];
        for (var j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        lines.push(tarr);
      }
    }
    const covidCurrent = lines[lines.length - 1];
    const covidPrevious = lines[lines.length - 8];
    setCovidCurrent({
      epoch: parseInt(covidCurrent[0]),
      tested: parseInt(covidCurrent[1]),
      positive: parseInt(covidCurrent[2]),
      deaths: parseInt(covidCurrent[3]),
    });
    setCovidPrevious({
      epoch: parseInt(covidPrevious[0]),
      tested: parseInt(covidPrevious[1]),
      positive: parseInt(covidPrevious[2]),
      deaths: parseInt(covidPrevious[3]),
    });
    console.log(lines[lines.length - 1] + " && " + lines[lines.length - 7]);
  }

  function covidData(stateAbbreviation) {
    axios({
      method: "get",
      url: `https://cors-anywhere-hhm.herokuapp.com/https://coronavirusapi.com/getTimeSeries/${stateAbbreviation}`,
    })
      .then((response) => {
        let data = response.data;
        processData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (showCovid && countryCode === "US") {
      getFinalState(stateName, addressObject);
    } else {
      setFinalStateName("");
    }
  }, [countryCode]);

  if (countryCode === "US") {
    return (
      <div>
        <div className="location">{finalStateName}</div>
        <ul className="latestCovid">
          <li>
            <span className="label">Current</span>
          </li>
          <li>
            Updated:{" "}
            {moment.unix(covidCurrent.epoch).utc().format("MMM D[,] YYYY")}
          </li>
          <li>tested: {covidCurrent.tested}</li>
          <li>positive: {covidCurrent.positive}</li>
          <li>deaths: {covidCurrent.deaths}</li>
        </ul>
        <ul className="previousCovid">
          <li>
            <span className="label">Rate of Increase</span>
          </li>
          <li>
            Changes as of:{" "}
            {moment.unix(covidPrevious.epoch).utc().format("MMM D[,] YYYY")}
          </li>
          <li>tested: +{covidCurrent.tested - covidPrevious.tested}</li>
          <li>positive: +{covidCurrent.positive - covidPrevious.positive}</li>
          <li>deaths: +{covidCurrent.deaths - covidPrevious.deaths}</li>
        </ul>
      </div>
    );
  } else {
    return <div>{finalStateName}</div>;
  }
};

export default CovidUS;

CovidUS.propTypes = {
  stateName: PropTypes.string,
  addressObject: PropTypes.object,
  countryCode: PropTypes.string,
  showCovid: PropTypes.bool,
};
