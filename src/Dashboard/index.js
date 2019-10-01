// >> GO GO POWER RANGERS!!!!!

import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  Brand,
  ModalinCard,
  ModalinBackground,
  NavBar,
  ScreenWrapper,
  TagLine
} from "./components";
import { InititalSignUpModal } from "./views";

export default class Dashboard extends Component {
  state = {
    screen: "Initial Signup",
    initialSignUp: true
  };
  onAuth = () => {
    console.log("Do stuff.");
  };
  onWelcome = () => {
    console.log(
      "wait a second before fading out the text and switching it to modalin and logo n handle"
    );
  };
  onLogoUpload = () => {
    console.log("Do stuff.");
  };
  onHandleUpload = () => {
    console.log(
      "google react controlled input or see how you did it previously"
    );
  };
  onSubmitLogoNHandle = () => {
    console.log("Do stuff.");
  };
  onSetRaffle = () => {
    console.log("Do stuff.");
  };
  onSetTableTent = () => {
    console.log("Do stuff.");
  };
  onSubmitRaffleNTableTent = () => {
    console.log("Do stuff.");
  };
  onToggleNavBarNavigation = tab => {
    console.log(`Do stuff with ${tab}.`);
  };
  whatDidIDoWithTheLastSetOfInstructionsRegardingTopBarIcons = () => {
    console.log("?");
  };
  /*
  handleInitiateNextScreen = () => {
    this.setState({ screen: "Next Screen" });
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
  */
  render() {
    const { initialSignUp } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Logoed Dash!</title>
        </Helmet>
        <ScreenWrapper>
          <NavBar initialSignUp={initialSignUp}>
            <LogoedLogoLongForm initialSignUp={initialSignUp} />
            {initialSignUp ? <TagLine /> : <NavBarLinkMap />}
            <ContactLinkButton />
          </NavBar>
          <MainWrapper>
            {modalin ? <Modal screen={screen} /> : null}
            <TopBar>
              {something ? <Brand screen={screen} /> : null}
              {logo ? <Logo /> : <LogoPlaceHolder />}
              <BusinessName>{businessName}</BusinessName>
              <IconSetMap />
            </TopBar>
            <ContentWrapper>
              <Content screen={screen} />>
            </ContentWrapper>
          </MainWrapper>
        </ScreenWrapper>
      </Fragment>
    );
  }
}

/*
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <div
          style={{
            width: "500px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#16161D"
          }}>
          <p style={{ color: "#FAFAFB", fontSize: 42 }}>Dashboard!</p>
        </div>
      </div>
    */
/*
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
    */
