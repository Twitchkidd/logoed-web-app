import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    font-size: 16px;
  }
`;

export default GlobalStyle;
