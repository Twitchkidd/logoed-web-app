import React, { Component, createRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import {
  ActionBar,
  BusinessLogo,
  Button,
  ButtonText,
  Header,
  Image,
  InstructionalText,
  LogoedLogoLongForm,
  ScreenWrapper,
  ShadowCanvas,
  Video,
  VideoWrapper
} from "../components";
import { sans } from "../../utilities";
import Moveable from "react-moveable";

var data;
var localMediaStream;

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

const CameraButton = styled(Button)`
  margin-top: 16px;
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
  background-image: none;
  background-color: white;
`;

export default class Logoing extends Component {
  constructor(props) {
    super(props);
    this.video = createRef();
    this.canvas = createRef();
    this.logo = createRef();
  }
  state = {
    ready: false,
    playing: false,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    snapped: false
  };
  componentDidMount() {
    this.launchPermissionPrompt();
  }
  launchPermissionPrompt = () => {
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
        localMediaStream = stream;
        this.video.current.srcObject = stream;
        if (os === "android") {
          this.video.current.play();
          this.setState({ ready: true, playing: true });
        } else {
          this.setState({ ready: true });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.noPermission();
      });
    this.setState({
      os
    });
    if (os === "ios") {
      this.video.current.play();
    }
  };
  snapPhoto = () => {
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
    context.drawImage(
      this.logo.current,
      this.state.left,
      this.state.top,
      width * 0.31,
      width * 0.31
    );
    data = this.canvas.current.toDataURL("image/png");
    this.setState({ snapped: true });
    localMediaStream.getVideoTracks()[0].stop();
  };
  handleTouchStart = e => {
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
  handleDrag = () => {
    console.log("handle drag!");
  };
  handleTouchEnd = e => {
    e.preventDefault();
    this.setState({
      touched: false
    });
  };
  render() {
    const { ready, touched, snapped, playing } = this.state;
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
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            this.setState({ left, top });
          }}
        />
        <Header>
          <LogoedLogoLongForm header />
        </Header>
        <VideoWrapper
          hidden={snapped}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleTouchEnd}>
          <BusinessLogo
            ref={this.logo}
            className='logo'
            src={businesses[this.props.business].logo}
            alt='Businesses logo'
            moving={touched}
          />
          <Video ref={this.video} autoplay playsInline>
            Video stream not yet available ...
          </Video>
        </VideoWrapper>
        <Image show={snapped} src={data} alt='camera view plus logo' />
        <ActionBar>
          {playing ? (
            <CameraButton onClick={() => this.snapPhoto()} />
          ) : (
            <InstructionalText style={{ marginTop: "calc(10vw + 8px)" }}>
              Tap and drag to place logo!
            </InstructionalText>
          )}
        </ActionBar>
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
