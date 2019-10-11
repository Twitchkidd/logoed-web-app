import React, { Component, createRef } from "react";
import * as clipboard from "clipboard-polyfill/dist/clipboard-polyfill.promise";
import {
  Button,
  ButtonText,
  Card,
  CardWrapper,
  Image,
  InformationalText,
  InstagramText,
  InstagramTextWrapper,
  InstructionalText,
  Header,
  LogoedLogoLongForm,
  ScreenWrapper,
  SharingActionBar,
  TooltipText,
  ToSBar,
  ToSLink
} from "../components";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import logoedLogo from "../assets/logoedLogoLongForm.png";

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
    logo: require("../assets/bonaire.png"),
    handle: "@testbonaire"
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

Modal.setAppElement("#root");

/*
  <Sharing
    business={business}
    top={top}
    left={left}
    snapshot={snapshot}
    logoedSnapshot={logoedSnapshot}
    initiateBack={this.handleBack}
  />
*/

export default class Sharing extends Component {
  constructor(props) {
    super(props);
    this.instaTextWrapper = createRef();
  }
  state = {
    business: null,
    top: null,
    left: null,
    snapshot: null,
    logoedSnapshot: null,
    modalin: false,
    ready: false,
    tooltipTimer: null
  };
  componentWillMount() {
    const { business, top, left, snapshot, logoedSnapshot } = this.props;
    this.setState({ business, top, left, snapshot, logoedSnapshot });
    // >> THIS IS DUMB
  }
  componentDidMount() {
    let tooltipTimer = setInterval(() => {
      this.simulateClick(this.instaTextWrapper);
    }, 500);
    this.setState({
      tooltipTimer
    });
    // this.toolTipFunctionPlease();
    // this.copyTextFunctionPlease();
    // this.modalOpenFunctionPlease();
    // this.listenForLongPressPlease();
    this.simulateClick(this.instaTextWrapper);
  }
  componentWillUnmount() {
    clearInterval(this.state.tooltipTimer);
  }
  simulateClick = el => {
    el.current.click();
  };
  popModal = () => {
    this.setState({ modalin: true });
  };
  dropModal = () => {
    this.copyText();
    this.setState({ modalin: false, ready: true });
  };
  copyText = () => {
    const { business } = this.props;
    const captionStrings = {
      introBody: "Yum! Snapped a photo with",
      logoedMention: "@logoedapp",
      bridgeBody: "at",
      businessMention: `${businesses[business].handle}`
    };
    const {
      introBody,
      logoedMention,
      bridgeBody,
      businessMention
    } = captionStrings;
    const captionString = `${introBody} ${logoedMention} ${bridgeBody} ${businessMention}`;
    clipboard.writeText(`${captionString}`);
  };
  onBack = () => {
    const { initiateBack } = this.props;
    initiateBack();
  };
  onShare = () => {
    window.location = "instagram://library?AssetPath=null";
    // If this gets clicked like 5 times or whatever, we should have a backup.
  };
  render() {
    const { business, logoedSnapshot, modalin, ready } = this.state;
    return (
      <ScreenWrapper>
        <Header>
          <LogoedLogoLongForm src={logoedLogo} alt='Logoed Logo' header />
        </Header>
        <CardWrapper>
          <Card>
            <Image src={logoedSnapshot} alt='logoed snapshot' />
            <InstagramTextWrapper
              ref={this.instaTextWrapper}
              data-tip
              data-for='tooltip'
              data-event='click'
              data-event-off='click'>
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
              delayShow={200}
              delayHide={200}
              afterHide={e => {
                this.popModal();
              }}
              role='tooltip'
              description='Caption copied to clipboard'>
              <TooltipText>Caption copied to clipboard!</TooltipText>
            </ReactTooltip>
          </Card>
        </CardWrapper>
        <SharingActionBar>
          <Button secondary onClick={this.onBack}>
            <ButtonText secondary>Back</ButtonText>
          </Button>
          <InformationalText style={{ maxWidth: "50vw" }}>
            Save the image, then off to Insta! Paste the caption in to make sure
            your entry counts!
          </InformationalText>
          {ready ? (
            <Button primary>
              <ButtonText
                primary
                as='a'
                href='instagram://library?AssetPath=null'>
                Share!
              </ButtonText>
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
          isOpen={modalin}
          onAfterOpen={this.makeButtonEnabledFunctionPlease}
          onRequestClose={this.maybeCheckIfTheImageWasSavedYet}
          style={customStyles}
          contentLabel='Logoed Modal'
          closeTimeoutMS={400}>
          <Image src={logoedSnapshot} alt='logoed snapshot' />
          <InstructionalText>
            Save the image to your camera roll! In most browsers, giving the
            image a long press does the trick!
          </InstructionalText>
          <Button primary buttonMcBigHuge onClick={this.dropModal}>
            <ButtonText primary>Got it!</ButtonText>
          </Button>
        </Modal>
      </ScreenWrapper>
    );
  }
}
