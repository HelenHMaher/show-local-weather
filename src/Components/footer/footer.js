import React from "react";

export const Footer = () => {
  return (
    <footer className="App-footer">
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
          </a>{" "}
          a service of{" "}
          <a
            href="https://www.openstreetmap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap.org
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
          </a>{" "}
          and{" "}
          <a
            href="https://www.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FreeCodeCamp.org
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
