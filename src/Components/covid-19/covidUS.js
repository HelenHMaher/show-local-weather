import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";

export const CovidUS = (props) => {
  const {} = props;

  const [covidUSData, setCovidUSData] = useState({});

  function covidData() {
    axios({
      method: "get",
      url: `https://coronavirusapi.com/getTimeSeries/${stateAbbreviation]}`
    })
      .then((response) => {
        let data = response.data;
        setCovidUSData(data);
        console.log(current);
      })
      .catch((error) => {
        console.log(error);
      });
}

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

};



