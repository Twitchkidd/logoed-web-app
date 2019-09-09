import React, { Component } from "react";
import {
  ScreenWrapper,
  Header,
  LogoedLogoLongForm,
  CardWrapper,
  Card,
  Image,
  InstagramTextWrapper,
  InstagramHandleText,
  InstagramBodyText,
  InstagramMentionsText,
  SharingActionBar,
  Button,
  ButtonText,
  InformationalText,
  ToSBar,
  ToSLink
} from "../components";

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

export default class Sharing extends Component {
  render() {
    const { data, business } = this.props;
    return (
      <ScreenWrapper>
        <Header>
          <LogoedLogoLongForm header />
        </Header>
        <CardWrapper>
          <Card>
            <Image src={data} />
            <InstagramTextWrapper>
              <InstagramHandleText>InstaYou</InstagramHandleText>
              <InstagramBodyText>Yum! Snapped a photo with</InstagramBodyText>
              <InstagramMentionsText>@logoedapp</InstagramMentionsText>
              <InstagramBodyText>at</InstagramBodyText>
              <InstagramMentionsText>
                {businesses[business].handle}
              </InstagramMentionsText>
            </InstagramTextWrapper>
          </Card>
        </CardWrapper>
        <SharingActionBar>
          <Button secondary onClick={() => this.handleBack}>
            <ButtonText secondary>Back</ButtonText>
          </Button>
          <InformationalText>
            Save the image, then off to Insta! Paste the caption in to make sure
            your entry counts!
          </InformationalText>
          {ready ? (
            <Button enabled onClick={() => this.handleShare}>
              <ButtonText enabled>Share!</ButtonText>
            </Button>
          ) : (
            <Button disabled>
              <ButtonText disabled>Share!</ButtonText>
            </Button>
          )}
        </SharingActionBar>
        <ToSBar>
          <ToSLink>Terms of Service</ToSLink>
        </ToSBar>
      </ScreenWrapper>
    );
  }
}
