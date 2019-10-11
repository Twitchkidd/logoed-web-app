import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    position: fixed;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    font-size: 16px;
    position: fixed;
  }
  .moveable-control-box {
    display: none !important;
  }
  .ReactModal__Overlay {
    background-color: #416ff9;
    position: absolute !important;
    top: 5000px;
    transition: top 400ms ease-out;
  } 
  .ReactModal__Overlay--after-open{
    top: 0px;
    transition: top 400ms ease-out;
  }
  .ReactModal__Overlay--before-close{
    top: 5000px;
    transition: top 400ms ease-out;
  }
`;

export default GlobalStyle;
