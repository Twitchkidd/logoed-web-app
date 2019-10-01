import React, { Component, Fragment } from "react";
import {
  Button,
  ButtonText,
  Heading,
  LogoedLogoLongForm,
  LogoedLogoSquareForm,
  PresentationalText,
  ScreenWrapper
} from "./components";

const BuffMcBigBox = styled.div`
  grid-column: ${props => (props.signUpMode ? "1 / span 1" : "1 / span 1")};
  grid-row: ${props => (props.signUpMode ? "1 / span 1" : "2 / span 2")};
  background-color: #253047;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;

// Those should be functions lol
const Logo = styled.div`
  height: ${props => (props.signUpMode ? "114px" : "228px")};
  width: ${props => (props.signUpMode ? "114px" : "228px")};
  position: ${props => (props.signUpMode ? "static" : "absolute")};
  ${props =>
    props.signUpMode
      ? css`
          margin-top: 88px;
        `
      : css`
          left: 20vw;
          top: -114px;
        `}
  z-index: 2;
`;

const ContentWrapper = styled.main`
  grid-column: ${props => (props.signUpMode ? "3 / span 1" : "2 / span 1")};
  grid-row: ${props => (props.signUpMode ? "1 / span 1" : "1 / span 3")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.signUpMode ? "flex-start" : "flex-end")};
`;

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
