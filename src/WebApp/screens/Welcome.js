import React, { Component } from "react";
import {
  BiggerPresentationalText,
  ScreenWrapper,
  BusinessLogo,
  Button,
  ButtonText,
  InformationalText,
  LogoedLogoLongForm,
  PresentationalText,
  ToSBar,
  ToSLink
} from "../components";

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
      <ScreenWrapper gradient>
        <LogoedLogoLongForm />
        <BiggerPresentationalText light>
          In partnership with:
        </BiggerPresentationalText>
        <BusinessLogo
          src={businesses[business].logo}
          alt={`${business} logo`}
        />
        <PresentationalText light>
          {businesses[business].name}
        </PresentationalText>
        <InformationalText
          light
          style={{ marginLeft: "15vw", marginRight: "15vw" }}>
          Snap a photo for your Instragram and put the{" "}
          {businesses[business].name} logo with on it to enter to win a $50 gift
          card!
        </InformationalText>
        <Button primary buttonMcBigHuge onClick={() => initiateLogoing()}>
          <ButtonText primary>Got it!</ButtonText>
        </Button>
        <ToSBar>
          <ToSLink>Terms of Service</ToSLink>
        </ToSBar>
      </ScreenWrapper>
    );
  }
}
