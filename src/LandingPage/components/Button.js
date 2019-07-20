// import React from "react";
import styled from "styled-components";
import { darkBlue, sans, mostlyWhite } from "../../utilities";

export const Button = styled.button`
  border-radius: 12px;
  background-color: ${darkBlue};
  text-align: center;
  height: 6.5em;
  width: 12em;
`;

Button.Text = styled.span`
  font-family: ${sans};
  font-size: 1.125em;
  color: ${mostlyWhite};
`;
