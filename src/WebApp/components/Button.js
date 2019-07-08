// import React from "react";
import styled from "styled-components";
import { blue, mediumGray, sans } from "../../utilities";

export const Button = styled.button`
  border-radius: ${props => (props.wide ? "8px" : "50%")};
  background-image: linear-gradient(${blue}, ${mediumGray});
  text-align: center;
  margin: 0, 10vw;
  height: 10vh;
  width: ${props => (props.wide ? "90vw" : "10vh")};
`;

Button.Text = styled.span`
  font-family: ${sans};
  font-size: 1.2em;
  color: white;
`;
