import React, { Component, Fragment } from "react";
import {
  BuffMcBigBox,
  Button,
  ButtonText,
  ContentWrapper,
  Heading,
  Logo,
  LogoedLogoLongForm,
  LogoedLogoSquareForm,
  PresentationalText,
  ScreenWrapper
} from "./components";

export default class LandingPage extends Component {
  state = {
    signUpMode: false
  };
  initiateSignUp = () => {
    this.setState({
      signUpMode: true
    });
  };
  submit = () => {
    console.log("boop!");
  };
  render() {
    const { signUpModeGo } = this.state;
    return (
      <LandingGrid signUpMode={signUpMode}>
        <BuffMcBigBox signUpMode={signUpMode}>
          <Logo signUpMode={signUpMode}>
            <img
              src={logo}
              style={{ height: "100%", width: "100%" }}
              alt='Logoed Logo'
            />
          </Logo>
        </BuffMcBigBox>
        <ContentWrapper signUpMode={signUpMode}>
          {signUpMode ? (
            <Fragment>
              <img src={longLogo} alt='Logoed Logo' />
              <div style={{ paddingLeft: "2em" }}>
                <H1>Welcome!</H1>
                <P>Test!</P>
                <P>Test!</P>
                <P>Test!</P>
                <Button onClick={() => this.submit()}>
                  <Button.Text>Boop!</Button.Text>
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <H1>Logoed</H1>
              <P>Make your advertizing hit home</P>
              <P>With user generated content and</P>
              <P>Level up your social media game, with Logoed</P>
              <Button onClick={() => this.initiateSignUp()}>
                <strong>
                  <Button.Text>Sign Up!</Button.Text>
                </strong>
              </Button>
            </Fragment>
          )}
        </ContentWrapper>
      </LandingGrid>
    );
  }
}
