import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  Brand,
  BusinessName,
  ContactLinkButton,
  LogoedLogoLongForm,
  MainWrapper,
  ModalinBackground,
  ModalinCard,
  NavBar,
  NavBarListMap,
  ScreenWrapper,
  TagLine,
  TopBar
} from "./components";
import { InititalSignUpModal } from "./views";

export default class Dashboard extends Component {
  state = {
    businessName: "HERP",
    logo: null,
    modalin: true,
    screen: "Initial Signup"
  };
  componentDidMount() {
    const { match, setInitialDashboardBusiness } = this.props;
    if (
      checkMockServer(match.params.DashboardBusiness) !==
      "Error! Can't find business in Logoed database!"
    ) {
      setInitialDashboardBusiness(match.params.DashboardBusiness);
    }
  }
  checkMockServer = dashboardBusiness => {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    if (businesses.includes(dashboardBusiness)) {
      return dashboardBusiness;
    } else {
      return "Error! Can't find business in Logoed database!";
    }
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
  render() {
    const { businessName, logo, modalin, screen } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Logoed Dash!</title>
        </Helmet>
        <ScreenWrapper>
          <NavBar initialSignUp={modalin}>
            <LogoedLogoLongForm initialSignUp={modalin} />
            {modalin ? <TagLine>Tagline text!</TagLine> : <NavBarListMap />}
            {modalin ? (
              <ContactLinkButton>Contact</ContactLinkButton>
            ) : (
              <DemoGroup />
            )}
          </NavBar>
          <MainWrapper>
            {modalin ? <Modal screen={screen} /> : null}
            <TopBar>
              {modalin ? <Brand screen={screen} /> : null}
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
