import React, { Component } from "react";

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
    const { business } = this.props;
    return (
      <div>
        <p style={{ margin: "19px", fontSize: 22 }}>
          {businesses[business].name}
        </p>
        <img
          style={{ width: "400px", height: "400px" }}
          src={businesses[business].logo}
          alt={`${business} logo`}
        />
        <p>Find us on Instagram! {businesses[business].handle}</p>
      </div>
    );
  }
}
