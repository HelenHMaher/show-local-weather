import styled from "styled-components";

export const StyledLocation = styled.section`
  padding: 5px 5px;
  font-size: 14px;
  width: 90%;

  input,
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

  #submit {
    margin-right: 10px;
  }
  .getLocation {
    margin-right: 20px;
  }

  form {
    display: block;
    max-width: 370px;
  }
  .input {
    cursor: text;
    display: block;
  }
  .inputSet {
    display: inline-block;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .label,
  label {
    font-size: 20px;
    padding-right: 5px;
  }

  .displayLocation {
    font-size: 14px;
    visibility: ${({ placeName, country }) =>
      placeName === "" && country === "" ? "hidden" : "visible"};
  }
`;
