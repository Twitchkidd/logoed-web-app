import React, { Component } from "react";
import { GradientWrapper, P, H2, Button } from "../components";
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
        <img
          src={logoedLogo}
          alt='Logoed Logo'
          style={{ marginTop: "1em", maxWidth: "90vw" }}
        />
        <H2 light>In partnership with:</H2>
        <img
          style={{ width: "200px", height: "200px" }}
          src={businesses[business].logo}
          alt={`${business} logo`}
        />
        <H2 light>{businesses[business].name}</H2>
        <P light style={{ marginLeft: "15vw", marginRight: "15vw" }}>
          Snap a photo for your Instragram and put the{" "}
          {businesses[business].name} logo with on it to enter to win a $50 gift
          card!
        </P>
        <Button wide absolute onClick={() => initiateLogoing()}>
          <Button.Text style={{ zIndex: 2 }}>Logo(ed)!</Button.Text>
        </Button>
      </GradientWrapper>
    );
  }
}
