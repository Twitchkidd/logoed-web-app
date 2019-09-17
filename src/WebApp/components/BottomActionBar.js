import React, { Component } from "react";
import styled from "styled-components";

// ! padding-left the difference between the right button and the left

const BottomActionBarBlock = styled.div`
  display: block;
  height: calc(74vh - 100vw - 72px);
`;

const BottomActionBarFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 4em;
  margin-left: 22px;
`;

export class BottomActionBar extends Component {
  render() {
    return (
      <BottomActionBarBlock>
        <BottomActionBarFlex>{this.props.children}</BottomActionBarFlex>
      </BottomActionBarBlock>
    );
  }
}
