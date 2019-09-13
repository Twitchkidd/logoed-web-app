import React, { Component, createRef } from "react";
import { Helmet } from "react-helmet";
import {
  BottomActionBar,
  BusinessLogo,
  Button,
  ButtonText,
  CameraRollButton,
  Header,
  InstructionalText,
  LogoedLogoLongForm,
  PossibleShadowBoxWeHaventDecided,
  ScreenWrapper,
  ShadowCanvas,
  Shutter,
  Snapshot,
  TopActionBar,
  Video,
  VideoWrapper
} from "../components";
import Moveable from "react-moveable";
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

export default class Logoing extends Component {
  constructor(props) {
    super(props);
    this.video = createRef();
    this.canvas = createRef();
    this.logo = createRef();
  }
  state = {
    data: null,
    back: false,
    noCameraPermission: false,
    ready: false,
    playing: false,
    snapped: false,
    logoed: false,
    uploaded: false,
    photo: null,
    height: 0,
    top: 0,
    left: 0,
    os: null,
    stream: null,
    isImageSet: false
  };
  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data,
        back: true
      });
    } else {
      this.startCamera();
    }
  }
  startCamera = () => {
    let os;
    if (navigator.vendor === "Apple Computer, Inc.") {
      os = "ios";
    } else if (navigator.vendor === "Google Inc.") {
      os = "android";
    } else {
      console.log("uh-oh");
    }
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: {
            min: 1080, // This is not the way.
            ideal: 1280
          },
          facingMode: "environment"
        }
      })
      .then(stream => {
        this.video.current.srcObject = stream;
        this.video.current.play();
        this.setState({ ready: true, playing: true, os, stream });
      })
      .catch(err => {
        console.log(err);
        this.setState({ noCameraPermission: true });
      });
  };
  snapPhoto = () => {
    const { left, top } = this.state;
    const width = window.innerWidth;
    let context = this.canvas.current.getContext("2d");
    context.canvas.width = width;
    context.canvas.height = width;
    context.drawImage(
      this.video.current,
      0,
      0,
      Math.round(width * 1.70048309),
      Math.round(width * 1.70048309),
      0,
      0,
      width,
      width
    );
    context.drawImage(this.logo.current, left, top, width * 0.31, width * 0.31);
    let photo = this.canvas.current.toDataURL("image/png");
    this.setImage(photo, "snapped");
  };
  onUpload = e => {
    const { photo } = this.state;
    let setImage = this.setImage;
    let file = e.target.files[0];
    if (file) {
      if (photo) {
        let isReplacePhotoConfirmed = window.confirm("Replace photo?");
        if (!isReplacePhotoConfirmed) {
          return;
        }
      }
      let reader = new FileReader();
      reader.onloadend = function(e) {
        setImage(e.target.result, "uploaded");
      };
      reader.readAsDataURL(file);
    }
  };
  setImage = (img, source) => {
    const { stream } = this.state;
    if (source === "uploaded") {
      this.setState({
        uploaded: true,
        snapped: false,
        photo: img,
        isImageSet: true
      });
      stream.getVideoTracks()[0].stop();
    } else if (source === "snapped") {
      this.setState({
        uploaded: false,
        snapped: true,
        photo: img,
        isImageSet: true
      });
      stream.getVideoTracks()[0].stop();
    } else {
      console.log("setImage called without proper source");
    }
  };
  resetImage = () => {
    const { stream } = this.state;
    this.setState({
      isImageSet: false,
      photo: null
    });
    this.startCamera();
  };
  onTouchStart = e => {
    e.preventDefault();
    this.setState({
      touched: true
    });
    if (this.state.playing === false) {
      this.video.current.play();
      this.setState({
        playing: true
      });
    }
  };
  onDrag = () => {
    // e.preventDefault(); ?
    console.log("handle drag!");
  };
  onTouchEnd = e => {
    // TODO Please write here whether the end state is within bounds, or however we do that check, and set this.state.logoed
    e.preventDefault();
    console.log(e);
    this.setState({
      touched: false
    });
  };
  handleShare = () => {
    const { initiateSharing } = this.props;
    const { data } = this.state;
    initiateSharing(data);
  };
  render() {
    const {
      data,
      ready,
      touched,
      snapped,
      playing,
      logoed,
      uploaded,
      noCameraPermission,
      photo,
      isImageSet
    } = this.state;
    const width = window.innerWidth;
    return (
      <ScreenWrapper>
        <Helmet>
          <meta
            name='viewport'
            content='user-scalable=no, width=device-width, initial-scale=1.0'
          />
          <meta name='apple-mobile-web-app-capable' content='yes' />
        </Helmet>
        <Moveable
          target={document.querySelector(".logo")}
          draggable={true}
          onDrag={({ target, left, top }) => {
            console.log(target);
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            this.setState({ left, top });
          }}
        />
        <Header>
          <LogoedLogoLongForm src={logoedLogo} alt='Logoed Logo' header />
        </Header>
        <VideoWrapper
          hidden={isImageSet}
          onTouchStart={this.onTouchStartVideo}
          onTouchMove={this.onDragVideo}
          onTouchEnd={this.onTouchEndVideo}>
          <BusinessLogo
            ref={this.logo}
            className='logo'
            src={businesses[this.props.business].logo}
            alt='Businesses logo'
            moving={touched}
            logoing
            actionBar={!logoed}
          />
          <Video ref={this.video} autoplay playsInline>
            Video stream not yet available ...
          </Video>
        </VideoWrapper>
        <Snapshot show={isImageSet} src={photo} alt='camera view plus logo' />
        <TopActionBar>
          <PossibleShadowBoxWeHaventDecided></PossibleShadowBoxWeHaventDecided>
          {logoed ? (
            noCameraPermission ? (
              <InstructionalText>
                Ready! Adjust logo, upload new snapshot, or go to the next step!
              </InstructionalText>
            ) : (
              <InstructionalText>
                Ready! Adjust logo, retake snapshot, or go to the next step!
              </InstructionalText>
            )
          ) : noCameraPermission ? (
            <InstructionalText>
              Upload a snapshot and tap and drag the logo into place!
            </InstructionalText>
          ) : isImageSet ? (
            <InstructionalText>
              Tap and drag the logo into place to go to the next step, or retake
              snapshot!
            </InstructionalText>
          ) : (
            <InstructionalText>
              Take a snapshot and tap and drag the logo into place!
            </InstructionalText>
          )}
        </TopActionBar>
        <BottomActionBar>
          <CameraRollButton upload={this.onUpload} />
          {isImageSet ? (
            <Button secondary onClick={() => this.resetImage()}>
              <ButtonText secondary>Retake</ButtonText>
            </Button>
          ) : ready ? (
            <Shutter onClick={() => this.snapPhoto()} />
          ) : (
            <Shutter disabled />
          )}
          {isImageSet ? (
            <Button primary onClick={this.handleShare}>
              <ButtonText primary>Ready!</ButtonText>
            </Button>
          ) : (
            <Button disabled>
              <ButtonText disabled>Ready!</ButtonText>
            </Button>
          )}
        </BottomActionBar>
        <ShadowCanvas ref={this.canvas} />
      </ScreenWrapper>
    );
  }
}

/*
Okay maybe instead of a shadow element, handle it with the wrapper element. Still undecided.
*******************************************
I need a shadow element here, since the Logo is being placed
absolutely, I need the // text to react as if the Logo was next to it
though, and then we handle the user not // getting the logo to the
video element by everything bouncing back into place. // This is going
to be delightful.
{playing ? (
  <CameraButton onClick={() => this.snapPhoto()} />
) : (
  <InstructionalText style={{ marginTop: "calc(10vw + 8px)" }}>
    Tap and drag to place logo!
  </InstructionalText>
)}
*/

/*
} else {
      this.setState({
        os: "android"
      });
      navigator.getUserMedia(
        { video: true },
        stream => {
          this.video.current.srcObject = stream;
          this.video.current.play();
          this.setCanvasSize();
        },
        function(err) {
          console.log(err);
          this.props.noPermission();
        }
      );
    }
    */

/*
  launchPermissionPrompt = () => {
    navigator.getWebcam =
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.video.current.srcObject = stream;
          this.video.current.play();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      navigator.getWebcam(
        { video: true },
        function(stream) {
          this.video.current.srcObject = stream;
          this.video.current.play();
        },
        function() {
          console.log("Webcam unavailable");
        }
      );
    }*/
/*
    navigator.getUserMedia(
      { video: true },
      function(stream) {
        this.video.current.srcObject = stream;
        this.video.current.play();
      },
      function() {
        console.log("Webcam unavailable");
      }
    );
  };
  */
/*
    navigator.mediaDevices
      .getUserMedia({ video: { width: 320 } })
      .then(stream => {
        this.video.current.srcObject = stream;
      })
      .catch(err => {
        console.log(err);
      });
  */
/*
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        this.video.current.srcObject = stream;
      })
      .catch(err => {
        console.log(err);
      });
  };
  */
