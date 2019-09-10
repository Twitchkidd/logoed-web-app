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
  InstructionalText,
  ToolTipText,
  ToSBar,
  ToSLink
} from "../components";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";

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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default class Sharing extends Component {
  state = {
    isModalOpen: false
  };
  componentDidMount() {
    this.toolTipFunctionPlease();
    this.modalOpenFunctionPlease();
  }
  render() {
    const { data, business } = this.props;
    const { isModalOpen } = this.state;
    return (
      <ScreenWrapper>
        <Header>
          <LogoedLogoLongForm header />
        </Header>
        <CardWrapper>
          <Card>
            <Image src={data} />
            <InstagramTextWrapper data-tip data-for='tooltip'>
              <InstagramHandleText>InstaYou</InstagramHandleText>
              <InstagramBodyText>Yum! Snapped a photo with</InstagramBodyText>
              <InstagramMentionsText>@logoedapp</InstagramMentionsText>
              <InstagramBodyText>at</InstagramBodyText>
              <InstagramMentionsText>
                {businesses[business].handle}
              </InstagramMentionsText>
            </InstagramTextWrapper>
            <ReactTooltip
              id='tooltip'
              aria-haspopup='true'
              type='light'
              effect='solid'
              role='information'
              description='Caption copied to clipboard'
              data-event='click'>
              <TooltipText light>Caption copied to clipboard!</TooltipText>
            </ReactTooltip>
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
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={this.makeButtonEnabledFunctionPlease}
          onRequestClose={this.maybeCheckIfTheImageWasSavedYet}
          style={customStyles}
          contentLabel='Logoed Modal'>
          <Image />
          <InstructionalText></InstructionalText>
          <Button
            primary
            buttonMcBigHuge
            onClick={this.closeModalFunctionPlease}>
            <ButtonText>Got it!</ButtonText>
          </Button>
        </Modal>
      </ScreenWrapper>
    );
  }
}