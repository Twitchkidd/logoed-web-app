import React, { Component } from "react";
import styled from "styled-components";

export const LogoedLogoLongForm = styled.img`
  ${props =>
    props.header ? `height: 8vh;` : `margin-top: 1em; max-width: 90vw;`}
`;
