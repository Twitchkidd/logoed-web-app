import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";
import logo from "./Logo228.png";
import longLogo from "./LongLogo478.png";
import { H1, P } from "./components";

const LandingGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: ${props =>
    props.signUpMode ? "290px 1fr max(5vw) 1fr" : "repeat(3, auto)"};
  grid-template-rows: ${props =>
    props.signUpMode ? "1fr" : "repeat(3, auto)"};
`;

const BuffMcBigBox = styled.div`
  grid-column: ${props => (props.signUpMode ? "1 / span 1" : "1 / span 2")};
  grid-row: ${props => (props.signUpMode ? "1 / span 1" : "2 / span 2")};
  background-color: "#253047";
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;

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
          left: calc(33vw - 342px);
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
  padding-left: ${props => (props.signUpMode ? "2em" : null)};
`;

export default class LandingPage extends Component {
  state = {
    signUpModeGo: false
  };
  signUp = () => {
    this.setState({
      signUpModeGo: true
    });
  };
  submit = () => {
    console.log('boop!');
  }
  render() {
    const { signUpModeGo } = this.state;
    return (
      <LandingGrid>
        <BuffMcBigBox signUpMode={signUpModeGo}>
          <Logo signUpMode={signUpModeGo}>
            <img src={logo} alt='Logoed Logo' />
          </Logo>
        </BuffMcBigBox>
        <ContentWrapper signUpMode={signUpModeGo}>
          {signUpModeGo ? (
            <Fragment>
              <img src={longLogo} alt="Logoed Logo" />
              <H1>Welcome!</H1>
              <P>Test!</P>
              <P>Test!</P>
              <P>Test!</P>
              <Button onClick={() => this.submit()}>
                <Button.Text>Boop!</Button.Text>
              </Button>
            </Fragment>
          ) : (
            <H1>Logoed</H1>
            <P>Make your advertizing hit home</P>
            <P>With user generated content and</P>
            <P>Level up your social media game, with Logoed</P>
            <Button onClick={() => this.signUp()}>
              <strong>
                <Button.Text>Sign Up!</Button.Text>
              </strong>
            </Button>
          }
        </ContentWrapper>
      </LandingGrid>
    );
  }
}
