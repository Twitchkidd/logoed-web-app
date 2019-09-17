import React, { Component } from "react";
import styled from "styled-components";

const TopActionBarBlock = styled.div`
  display: block;
  height: calc(18vw + 1em);
`;

const TopActionBarFlex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export class TopActionBar extends Component {
  render() {
    return (
      <TopActionBarBlock>
        <TopActionBarFlex>{this.props.children}</TopActionBarFlex>
      </TopActionBarBlock>
    );
  }
}
