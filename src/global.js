import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: white;
  background: ${({ dayNight }) =>
    dayNight === "day"
      ? "#87CEEB"
      : dayNight === "dawn"
      ? "#F8B195"
      : dayNight === "dusk"
      ? "#6C5B7B"
      : "#355C7D"};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: lightgrey;
  text-decoration: none;
}

li {
  list-style-type: none;
}

`;
