import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`;

export default class DashboardSite extends Component {
  render() {
    return (
      <Wrapper>
        <div>Dashboard site!</div>
      </Wrapper>
    );
  }
}
