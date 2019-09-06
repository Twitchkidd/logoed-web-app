import React, { Component } from "react";
import Welcome from "./screens/Welcome";
import Logoing from "./screens/Logoing";

export default class WebApp extends Component {
  state = {
    screen: "Welcome"
  };
  handleInitiateLogoing = () => {
    this.setState({ screen: "Logoing" });
  };
  handleNoPermission = () => {
    this.setState({ screen: "No Permission" });
  };
  render() {
    const { business } = this.props;
    if (this.state.screen === "Welcome") {
      return (
        <Welcome
          business={business}
          initiateLogoing={this.handleInitiateLogoing}
        />
      );
    } else if (this.state.screen === "Logoing") {
      return (
        <Logoing business={business} noPermission={this.handleNoPermission} />
      );
    } else if (this.state.screen === "No Permission") {
      return (
        <p>
          Whoops! This app needs camera access to work! Please restart the
          browser and hit the qr code to try again!
        </p>
      );
    }
  }
}
