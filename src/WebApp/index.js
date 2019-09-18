import React, { Component } from "react";
import Welcome from "./screens/Welcome";
import Logoing from "./screens/Logoing";
import Sharing from "./screens/Sharing";
import Returned from "./screens/Returned";

export default class WebApp extends Component {
  state = {
    screen: "Welcome",
    logoedSnapshot: null,
    snapshot: null,
    logo: null,
    top: 0,
    left: 0
  };
  handleInitiateLogoing = () => {
    this.setState({ screen: "Logoing" });
  };
  handleNoPermissions = () => {
    this.setState({ screen: "No Permissions" });
  };
  handleInitiateSharing = data => {
    const { top, left, snapshot, logoedSnapshot } = data;
    this.setState({
      top,
      left,
      snapshot,
      logoedSnapshot,
      screen: "Sharing"
    });
  };

  render() {
    const { data, business } = this.props;
    if (this.state.screen === "Welcome") {
      return (
        <Welcome
          business={business}
          initiateLogoing={this.handleInitiateLogoing}
        />
      );
    } else if (this.state.screen === "Logoing") {
      return (
        <Logoing
          business={business}
          data={data}
          noPermissions={this.handleNoPermissions}
          initiateSharing={this.handleInitiateSharing}
        />
      );
    } else if (this.state.screen === "Sharing") {
      return <Sharing business={business} data={data} />;
    } else if (this.state.screen === "Returned") {
      return <Returned business={business} />;
    } else if (this.state.screen === "No Permissions") {
      return (
        <p>
          Whoops! This app needs camera access or permission to read from the
          camera roll to work! Please restart the browser and hit the qr code
          again to give it another try! Sorry, we can't find another way to
          reset it than works other than closing the whole browser session (all
          tabs) :(
        </p>
      );
    }
  }
}
