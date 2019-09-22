import React, { Component } from "react";
import Welcome from "./screens/Welcome";
import Logoing from "./screens/Logoing";
import Sharing from "./screens/Sharing";
import Returned from "./screens/Returned";

export default class WebApp extends Component {
  state = {
    screen: "Welcome",
    top: 0,
    left: 0,
    snapshot: null,
    logoedSnapshot: null,
    snapped: null,
    uploaded: null
  };
  handleInitiateLogoing = () => {
    this.setState({ screen: "Logoing" });
  };
  handleNoPermissions = () => {
    this.setState({ screen: "No Permissions" });
  };
  handleInitiateSharing = data => {
    const { top, left, snapshot, logoedSnapshot, snapped, uploaded } = data;
    this.setState({
      top,
      left,
      snapshot,
      logoedSnapshot,
      snapped,
      uploaded,
      screen: "Sharing"
    });
  };
  handleBack = () => {
    this.setState({
      screen: "Logoing"
    });
  };
  render() {
    const { business } = this.props;
    const {
      screen,
      top,
      left,
      snapshot,
      logoedSnapshot,
      snapped,
      uploaded
    } = this.state;
    if (screen === "Welcome") {
      return (
        <Welcome
          business={business}
          initiateLogoing={this.handleInitiateLogoing}
        />
      );
    } else if (screen === "Logoing") {
      return (
        <Logoing
          business={business}
          top={top}
          left={left}
          snapshot={snapshot}
          logoedSnapshot={logoedSnapshot}
          snapped={snapped}
          uploaded={uploaded}
          initiateSharing={this.handleInitiateSharing}
          noPermissions={this.handleNoPermissions}
        />
      );
    } else if (screen === "Sharing") {
      return (
        <Sharing
          business={business}
          top={top}
          left={left}
          snapshot={snapshot}
          logoedSnapshot={logoedSnapshot}
          initiateBack={this.handleBack}
        />
      );
    } else if (screen === "Returned") {
      return <Returned business={business} />;
    } else if (screen === "No Permissions") {
      // TODO this needs to be rewritten because you don't have camera roll permission
      // TODO for mobile web, it's just a file upload, so this is likely just going to find
      // TODO its way to an FAQ at some point
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
