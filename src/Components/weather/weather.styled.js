import styled from "styled-components";

export const StyledWeather = styled.section`
  padding: 5px;
  font-size: 14px;
  width: 90%;

  .label {
    font-size: 20px;
    padding-right: 5px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 5px 0;
  }

  .time {
    font-size: 18px;
    padding: 5px;
    width: 100%;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 16px;
    }
  }
  #displayTempUnits {
    :hover {
      cursor: pointer;
      color: black;
    }
  }
`;
