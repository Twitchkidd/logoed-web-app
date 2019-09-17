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
  ScreenWrapper,
  ShadowCanvas,
  ShadowLogo,
  Shutter,
  Snapshot,
  SnapshotWrapper,
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
    this.logo = createRef();
    this.shadowLogo = createRef();
    this.video = createRef();
    this.canvas = createRef();
  }
  state = {
    back: false,
    noCameraPermission: false,
    stream: null,
    logoed: false,
    top: null,
    left: null,
    dragging: false,
    shutterPressed: false,
    snapshot: null,
    logoedSnapshot: null,
    snapped: false,
    uploaded: false,
    ready: false
  };
  componentDidMount() {
    console.log(window.innerHeight);
    if (this.props.logoedSnapshot) {
      this.setState({
        data: this.props.data,
        back: true
      });
    } else {
      this.startCamera();
      this.setLogoInitialPosition();
    }
  }
  setLogoInitialPosition = () => {
    // ! Are we coming from a returned state or not?
    // * If back, top and left equal to the incoming top and left,
    // * otherwise, top and left equal to things dependent on first render.
    if (this.state.back) {
      console.log("wopp!");
    }
    let rect = this.shadowLogo.current.getBoundingClientRect();
    this.setState(
      {
        top: Math.round(rect.top),
        left: Math.round(rect.left)
      },
      () => {
        this.logo.current.style.top = `${this.state.top}px`;
        this.logo.current.style.left = `${this.state.left}px`;
      }
    );
  };
  toLogoedOrNotToLogoed = () => {
    const { left, right } = this.props;
    const width = window.innerWidth;
    this.setState(
      {
        dragging: false,
        logoed: true
      },
      () => {
        console.log("hey");
      }
    );
  };
  startCamera = () => {
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
        this.setState({ isVideoPlaying: true, stream });
      })
      .catch(err => {
        console.log(err);
        this.setState({ noCameraPermission: true });
      });
  };
  shutterPress = () => {
    this.setState({
      shutterPressed: true
    });
  };
  shutterUnpress = () => {
    this.setState({
      shutterPressed: false
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
    let snapshot = this.canvas.current.toDataURL("image/png");
    this.setState({
      snapshot
    });
    context.drawImage(this.logo.current, left, top, width * 0.31, width * 0.31);
    let logoedSnapshot = this.canvas.current.toDataURL("image/png");
    this.setImage(logoedSnapshot, "snapped");
  };
  onUpload = e => {
    const { snapshot } = this.state;
    let setImage = this.setImage;
    let file = e.target.files[0];
    if (file) {
      if (snapshot) {
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
      this.setState(
        {
          uploaded: true,
          snapped: false,
          snapshot: img
        },
        () => {
          console.log("trigger logo the snapshot here");
        }
      );
      if (stream) {
        stream.getVideoTracks()[0].stop();
      }
    } else if (source === "snapped") {
      this.setState(
        {
          uploaded: false,
          snapped: true,
          snapshot: img
        },
        () => {
          console.log("trigger logo the snapshot here");
        }
      );
      if (stream) {
        stream.getVideoTracks()[0].stop();
      }
    } else {
      console.log("setImage called without proper source");
    }
  };
  resetImage = () => {
    this.setState({
      snapped: false,
      uploaded: false,
      snapshot: null
    });
    this.startCamera();
  };
  handleShare = () => {
    const { initiateSharing, top, left, snapshot, logoedSnapshot } = this.props;
    const data = {
      top,
      left,
      snapshot,
      logoedSnapshot
    };
    initiateSharing(data);
  };
  render() {
    const {
      noCameraPermission,
      logoed,
      dragging,
      shutterPressed,
      snapped,
      uploaded,
      snapshot
    } = this.state;
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
          onDragStart={() => {
            this.setState({
              dragging: true
            });
          }}
          onDrag={({ target, left, top }) => {
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            this.setState({ left, top });
          }}
          onDragEnd={() => {
            this.toLogoedOrNotToLogoed();
          }}
        />
        <BusinessLogo
          ref={this.logo}
          className='logo'
          src={businesses[this.props.business].logo}
          alt='Businesses logo'
          logoing
          moving={dragging}
          actionBar={logoed ? false : true}
        />
        <Header>
          <LogoedLogoLongForm src={logoedLogo} alt='Logoed Logo' header />
        </Header>
        {snapped || uploaded ? (
          <SnapshotWrapper>
            <Snapshot src={snapshot} alt='camera view plus logo' />
          </SnapshotWrapper>
        ) : (
          <VideoWrapper>
            <Video ref={this.video} autoplay playsInline>
              Video stream not yet available ...
            </Video>
          </VideoWrapper>
        )}
        <TopActionBar>
          {logoed ? null : <ShadowLogo ref={this.shadowLogo} />}
          <InstructionalText actionBar>
            {logoed && noCameraPermission && uploaded
              ? "Ready! Adjust logo, upload new snapshot, or go to the next step!"
              : logoed && noCameraPermission
              ? "Upload a snapshot and adjust logo to go to the next step!"
              : logoed && (snapped || uploaded)
              ? "Ready! Adjust logo or go to the next step!"
              : logoed
              ? "Take or upload snapshot and adjust logo to go to the next step!"
              : snapped || uploaded
              ? "Tap and drag logo into place to go to the next step!"
              : noCameraPermission
              ? "Upload a snapshot and tap and drag logo into place to go to the next step!"
              : "Take or upload snapshot and tap and drag logo into place to go to the next step!"}
          </InstructionalText>
        </TopActionBar>
        <BottomActionBar>
          <CameraRollButton upload={this.onUpload} />
          {snapped || uploaded ? (
            <Button secondary onClick={() => this.resetImage()}>
              <ButtonText secondary>Retake</ButtonText>
            </Button>
          ) : noCameraPermission ? (
            <Shutter disabled />
          ) : (
            <Shutter
              pressed={shutterPressed}
              onClick={() => this.snapPhoto()}
              onTouchStart={() => this.shutterPress()}
              onTouchEnd={() => this.shutterUnpress()}
            />
          )}
          {(snapped || uploaded) && logoed ? (
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
/*
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
        this.setState({ isVideoPlaying: true, os, stream });
      })
      .catch(err => {
        console.log(err);
        this.setState({ noCameraPermission: true });
      });
  };
*/
