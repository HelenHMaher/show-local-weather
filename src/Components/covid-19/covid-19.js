import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { StyledCovid19 } from "./covid-19.styled";
import CovidUS from "./covidUS";

export const Covid19 = (props) => {
  const { countryCode, date, addressObject, placeName } = props;

  const [showCovid, setShowCovid] = useState(false);
  const [latestCovid, setLatestCovid] = useState({});
  const [previousCovid, setPreviousCovid] = useState({});

  useEffect(() => {
    if (!countryCode.countryCode) {
      setShowCovid(false);
    }
  }, [countryCode]);

  function covidData() {
    if (!showCovid && countryCode.countryCode.length === 2) {
      const formatedDate = moment.unix(date - 604800).format("YYYY-MM-DD");
      axios({
        method: "get",
        url: `https://covid19-api.org/api/status/${countryCode.countryCode}`,
      })
        .then((response) => {
          let current = response.data;
          setLatestCovid(current);
          //console.log(current);
        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "get",
        url: `https://covid19-api.org/api/status/${countryCode.countryCode.toUpperCase()}`,
        params: {
          date: formatedDate,
        },
      })
        .then((response) => {
          let previous = response.data;
          setPreviousCovid(previous);
          //console.log(previous);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowCovid(!showCovid);
  }
  if (showCovid && countryCode.countryCode) {
    return (
      <StyledCovid19>
        <button className="getCovid" onClick={covidData}>
          Hide COVID-19 data
        </button>
        <div className="location">{countryCode.country}</div>
        <ul className="latestCovid">
          <li>
            <span className="label">Current</span>
          </li>
          <li>
            Updated:{" "}
            {moment(latestCovid.last_update).utc().format("MMM D[,] YYYY")}
          </li>
          <li>cases: {latestCovid.cases}</li>
          <li>recovered: {latestCovid.recovered}</li>
          <li>deaths: {latestCovid.deaths}</li>
        </ul>
        <ul className="previousCovid">
          <li>
            <span className="label">Rate of Increase</span>
          </li>
          <li>
            Changes as of:{" "}
            {moment(previousCovid.last_update).utc().format("MMM D[,] YYYY")}
          </li>
          <li>cases: +{latestCovid.cases - previousCovid.cases}</li>
          <li>recovered: +{latestCovid.recovered - previousCovid.recovered}</li>
          <li>deaths: +{latestCovid.deaths - previousCovid.deaths}</li>
        </ul>
        <CovidUS
          placeName={placeName}
          addressObject={addressObject}
          countryCode={countryCode.countryCode}
          showCovid={showCovid}
        />
      </StyledCovid19>
    );
  } else if (countryCode.countryCode) {
    return (
      <StyledCovid19>
        <button className="getCovid" onClick={covidData}>
          show COVID-19 data
        </button>
      </StyledCovid19>
    );
  } else {
    return <div>{countryCode.countryCode}</div>;
  }
};

export default Covid19;

Covid19.propTypes = {
  countryCode: PropTypes.object,
  date: PropTypes.number,
  addressObject: PropTypes.object,
  placeName: PropTypes.string,
};
