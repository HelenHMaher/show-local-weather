import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: white;
  background: black;
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
