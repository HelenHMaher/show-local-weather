import styled from "styled-components";

export const StyledCovid19 = styled.section`
  padding: 5px 5px;
  font-size: 14px;
  width: 90%;

  button {
    all: unset;
    margin-right: 20px;
    background: white;
    color: darkgrey;
    border: 2px solid;
    border-color: darkgrey;
    border-radius: 5px;
    padding: 3px;
    font: inherit;
    cursor: pointer;
    outline: none;
    &:hover {
      transform: scale(1.01);
      border-color: black;
      color: black;
    }
    &:active {
      transform: scale(0.9);
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  .label {
    font-size: 20px;
    padding-right: 5px;
  }

  .location {
    margin-top: 10px;
    font-size: 30px;
  }
`;
