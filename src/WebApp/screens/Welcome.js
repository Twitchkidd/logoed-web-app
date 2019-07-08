import React, { Component } from "react";
import { GradientWrapper } from "../components";
import logoedLogo from "../assets/logo-1x.png";

const businesses = {
  Burgerology: {
    name: "Burgerology",
    logo: require("../assets/burgerology-logo.jpg"),
    handle: "@burgerologyny"
  },
  Jonathans: {
    name: "Jonathans",
    logo: require("../assets/jonathans-logo.png"),
    handle: "@jonathansrestaurantli"
  },
  Leilu: {
    name: "Leilu",
    logo: require("../assets/leilu-logo.png"),
    handle: "@leiluhuntington"
  },
  demo: {
    name: "Demo biz!",
    logo: require("../assets/afake-logo.png"),
    handle: "@fakemafia"
  }
};

export default class Welcome extends Component {
  render() {
    const { business, initiateLogoing } = this.props;
    return (
      <GradientWrapper>
        <img src={logoedLogo} alt='Logoed Logo' />
        <p>In partnership with:</p>
        <img
          style={{ width: "200px", height: "200px" }}
          src={businesses[business].logo}
          alt={`${business} logo`}
        />
        <p style={{ margin: "19px", fontSize: 22 }}>
          {businesses[business].name}
        </p>
        <p>
          Snap a photo for your Instragram and put the Burgerology logo with on
          it to enter to win a $50 gift card!
        </p>
        <button onClick={() => initiateLogoing()}>I'm a button!</button>
      </GradientWrapper>
    );
  }
}
