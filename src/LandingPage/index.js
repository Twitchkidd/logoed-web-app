import React, { Component, Fragment } from "react";
import {
  BuffMcBigBox,
  Button,
  // ButtonText,
  ContentWrapper,
  Heading,
  Logo,
  // LogoedLogoLongForm,
  // LogoedLogoSquareForm,
  PresentationalText,
  ScreenWrapper
} from "./components";
import logo from "./Logo228.png";
import longLogo from "./LongLogo478.png";

export default class LandingPage extends Component {
  state = {
    signUpMode: false,
    ready: false
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
    const { signUpMode } = this.state;
    return (
      <ScreenWrapper signUpMode={signUpMode}>
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
                <Heading>Welcome!</Heading>
                <PresentationalText>Test!</PresentationalText>
                <PresentationalText>Test!</PresentationalText>
                <PresentationalText>Test!</PresentationalText>
                <Button onClick={() => this.submit()}>
                  <Button.Text>Boop!</Button.Text>
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Heading>Logoed</Heading>
              <PresentationalText>
                Make your advertizing hit home
              </PresentationalText>
              <PresentationalText>
                With user generated content and
              </PresentationalText>
              <PresentationalText>
                Level up your social media game, with Logoed
              </PresentationalText>
              <Button onClick={() => this.initiateSignUp()}>
                <strong>
                  <Button.Text>Sign Up!</Button.Text>
                </strong>
              </Button>
            </Fragment>
          )}
        </ContentWrapper>
      </ScreenWrapper>
    );
  }
}
