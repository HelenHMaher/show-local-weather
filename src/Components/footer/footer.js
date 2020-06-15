import React from "react";
import { StyledFooter } from "./footer.styled";

export const Footer = () => {
  return (
    <StyledFooter className="App-footer">
      <hr />
      <ul>
        <li>coded by Helen Maher</li>
        <li>
          location data powered by{" "}
          <a
            href="https://nominatim.openstreetmap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nominatium
          </a>
        </li>
        <li>
          weather data powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeatherMap.org
          </a>
        </li>
        <li>
          time zone data powered by{" "}
          <a
            href="https://ipgeolocation.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ipgeolocation
          </a>
        </li>
        <li>
          COVID-19 data powered by{" "}
          <a
            href="https://covid19-api.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            COVID-19 API
          </a>{" "}
          and the{" "}
          <a
            href="https://coronavirusapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coronavirus API Public Health Initiative
          </a>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
