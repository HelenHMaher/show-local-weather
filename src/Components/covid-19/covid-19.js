import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";

export const Covid19 = (props) => {
  const { countryCode, date } = props;

  const [showCovid, setShowCovid] = useState(false);
  const [latestCovid, setLatestCovid] = useState({});
  const [previousCovid, setPreviousCovid] = useState({});

  function covidData() {
    if (!showCovid) {
      const formatedDate = moment.unix(date - 604800).format("YYYY-MM-DD");
      axios({
        method: "get",
        url: `https://covid19-api.org/api/status/${countryCode.countryCode.toUpperCase()}`,
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
  if (showCovid) {
    return (
      <div className="CovidInfo">
        <button className="getCovid" onClick={covidData}>
          Hide COVID-19 data
        </button>
        <div className="location">{countryCode.country}</div>
        <ul className="latestCovid">
          <li>Current</li>
          <li>Updated: {latestCovid.last_update}</li>
          <li>cases: {latestCovid.cases}</li>
          <li>recovered: {latestCovid.recovered}</li>
          <li>deaths: {latestCovid.deaths}</li>
        </ul>
        <ul className="previousCovid">
          <li>Changes in the last 7 days</li>
          <li>Updated: {previousCovid.last_update}</li>
          <li>cases: +{latestCovid.cases - previousCovid.cases}</li>
          <li>recovered: +{latestCovid.recovered - previousCovid.recovered}</li>
          <li>deaths: +{latestCovid.deaths - previousCovid.deaths}</li>
        </ul>
      </div>
    );
  } else if (Object.keys(countryCode).length > 0) {
    return (
      <button className="getCovid" onClick={covidData}>
        show COVID-19 data in {countryCode.country}
      </button>
    );
  } else {
    return <div>{countryCode.country}</div>;
  }
};

export default Covid19;

Covid19.propTypes = {
  countryCode: PropTypes.object,
  date: PropTypes.number,
};
