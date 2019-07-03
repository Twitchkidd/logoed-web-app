import React, { Component } from "react";
import styled from "styled-components";
import { lightOrange, darkOrange } from "../../utilities";
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

const WelcomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(${lightOrange}, ${darkOrange});
`;

export default class Welcome extends Component {
  render() {
    const { business } = this.props;
    return (
      <WelcomeWrapper>
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
          it to enter to win a $50 gift card! More posts mean more chances to
          win!
        </p>
        <button onClick={() => console.log("boop!")}>I'm a button!</button>
      </WelcomeWrapper>
    );
  }
}
