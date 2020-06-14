import styled from "styled-components";

export const StyledLocation = styled.section`
  padding: 5px 0;
  font-size: 14px;
  width: 90%;
  .time {
    font-size: 18px;
    padding: 5px;
    width: 100%;
  }
  .dayNight {
    display: inline-block;
    padding: 0 5px;
    font-size: 30px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 20px;
    }
  }
  .weatherTheme {
    font-size: 40px;
    display: inline-block;
    padding: 0 5px;
  }
`;
