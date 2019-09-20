import React, { Component } from "react";
import {
  ScreenWrapper,
  Header,
  LogoedLogoLongForm,
  CardWrapper,
  Card,
  Image,
  InstagramTextWrapper,
  SharingActionBar,
  Button,
  ButtonText,
  InformationalText,
  InstagramText,
  InstructionalText,
  TooltipText,
  ToSBar,
  ToSLink
} from "../components";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import logoedLogo from "../assets/logo-1x.png";

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
    isModalOpen: false,
    ready: true,
    top: null,
    left: null,
    snapshot: null,
    logoedSnapshot: null
  };
  componentWillMount() {
    const { top, left, snapshot, logoedSnapshot } = this.props;
    this.setState({ top, left, snapshot, logoedSnapshot });
  }
  componentDidMount() {
    // this.toolTipFunctionPlease();
    // this.copyTextFunctionPlease();
    // this.modalOpenFunctionPlease();
    // this.listenForLongPressPlease();
  }
  handleBack = () => {
    const { initiateBack } = this.props;
    initiateBack();
  };
  render() {
    console.log(this.state);
    const { business } = this.props;
    const {
      isModalOpen,
      ready,
      top,
      left,
      snapshot,
      logoedSnapshot
    } = this.state;
    return (
      <ScreenWrapper>
        <Header>
          <LogoedLogoLongForm src={logoedLogo} alt='Logoed Logo' header />
        </Header>
        <CardWrapper>
          <Card>
            <Image src={logoedSnapshot} alt='logoed snapshot' />
            <InstagramTextWrapper data-tip data-for='tooltip'>
              <InstagramText handle>InstaYou</InstagramText>&nbsp;
              <InstagramText>Yum! Snapped a photo with</InstagramText>&nbsp;
              <InstagramText atMention>@logoedapp</InstagramText>&nbsp;
              <InstagramText>at</InstagramText>&nbsp;
              <InstagramText atMention>
                {businesses[business].handle}
              </InstagramText>
            </InstagramTextWrapper>
            <ReactTooltip
              id='tooltip'
              type='light'
              effect='solid'
              role='tooltip'
              description='Caption copied to clipboard'
              data-event='click'>
              <TooltipText light>Caption copied to clipboard!</TooltipText>
            </ReactTooltip>
          </Card>
        </CardWrapper>
        <SharingActionBar>
          <Button secondary onClick={this.handleBack}>
            <ButtonText secondary>Back</ButtonText>
          </Button>
          <InformationalText>
            Save the image, then off to Insta! Paste the caption in to make sure
            your entry counts!
          </InformationalText>
          {ready ? (
            <Button primary onClick={() => this.handleShare}>
              <ButtonText primary>Share!</ButtonText>
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
          <InstructionalText>fgdxgchjb,</InstructionalText>
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
