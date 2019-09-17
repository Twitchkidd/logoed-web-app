import React, { Component } from "react";
import styled from "styled-components";
import { lightOrange } from "../../utilities";

const HeaderBlock = styled.div`
  display: block;
  height: 8vh;
  width: 100%
  background-color: ${lightOrange};
`;

const HeaderFlex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export class Header extends Component {
  render() {
    return (
      <HeaderBlock>
        <HeaderFlex>{this.props.children}</HeaderFlex>
      </HeaderBlock>
    );
  }
}
