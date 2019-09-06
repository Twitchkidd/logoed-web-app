import React, { Component } from "react";
import styled from "styled-components";
import logoedLogo from "../assets/logo-1x.png";

const StyledLogo = styled.img`
  ${props =>
    props.header ? `height: 8vh;` : `margin-top: 1em; max-width: 90vw;`}
`;

export default class LogoedLogoLongForm extends Component {
  render() {
    return <StyledLogo src={logoedLogo} alt='Logoed Logo' />;
  }
}
