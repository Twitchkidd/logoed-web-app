import React, { Component } from "react";
import {
  BiggerPresentationalText,
  ScreenWrapper,
  BusinessLogo,
  Button,
  ButtonText,
  InformationalText,
  LogoedLogoLongForm,
  ToSBar,
  ToSLink
} from "../components";
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
      <ScreenWrapper gradient>
        <LogoedLogoLongForm
          src={logoedLogo}
          alt='Logoed Logo'
          style={{ marginTop: "1em" }}
        />
        <BiggerPresentationalText light>
          In partnership with:
        </BiggerPresentationalText>
        <BusinessLogo
          src={businesses[business].logo}
          alt={`${business} logo`}
        />
        <InformationalText light style={{ margin: "1em 15vw" }}>
          Snap a photo for your Instragram and put the{" "}
          {businesses[business].name} logo on it to enter to win a $50 gift
          card!
        </InformationalText>
        <Button primary buttonMcBigHuge onClick={() => initiateLogoing()}>
          <ButtonText primary>Got it!</ButtonText>
        </Button>
        <ToSBar style={{ margin: "1em 0" }}>
          <ToSLink>
            <u>Terms of Service</u>
          </ToSLink>
        </ToSBar>
      </ScreenWrapper>
    );
  }
}
