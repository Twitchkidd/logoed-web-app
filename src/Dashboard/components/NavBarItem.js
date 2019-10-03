import React, { Component } from "react";
import styled from "styled-components";

const StyledNavBarItem = styled.li`
  text-decoration: none;
`;

export default class NavBarItem extends Component {
  render() {
    const { i, text } = this.props;
    return <StyledNavBarItem key={i}>{text}</StyledNavBarItem>;
  }
}
