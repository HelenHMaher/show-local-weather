import styled from "styled-components";

export const StyledFooter = styled.footer`
  a {
    text-decoration: none;
    color: white;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  margin-top: 40px;
  padding: 5px;

  font-size: 10px;
`;
