import React, { Component } from "react";
import { PresentationalText, ScreenWrapper } from "../components";

export default class Returned extends Component {
  render() {
    return (
      <ScreenWrapper gradient>
        <PresentationalText>HI!!! You're back! How'd it go?</PresentationalText>
      </ScreenWrapper>
    );
  }
}
