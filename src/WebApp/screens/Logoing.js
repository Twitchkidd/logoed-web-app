import React, { Component, createRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Button } from "../components";
import logoedLogo from "../assets/logo-1x.png";
import { lightOrange, sans } from "../../utilities";
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

const ScreenWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const Header = styled.header`
  height: 12vh;
  background-color: ${lightOrange};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.videoWidth}px;
  overflow: hidden;
  display: ${props => (props.hidden ? "none" : "block")};
`;

const Logo = styled.img`
  position: absolute;
  transition: opacity 1.8s;
  opacity: ${props => (props.ready ? (props.moving ? 0.6 : 1.0) : 0.0)};
  z-index: 8000;
`;

const Video = styled.video`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;

const ActionBar = styled.div`
  flex: 1;
  background-color: ${lightOrange};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Instructions = styled.p`
  ${sans};
  color: white;
  margin-top: calc(10vw + 8px);
`;

const CameraButton = styled(Button)`
  margin-top: 16px;
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
  background-image: none;
  background-color: white;
`;

const Image = styled.img`
  display: ${props => (props.show ? "block" : "none")};
  width: ${props => props.videoWidth}px;
  height: ${props => props.videoWidth}px;
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
    width: 0,
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
      os: os,
      width: this.video.current.offsetWidth,
      height: this.video.current.offsetHeight
    });
    if (os === "ios") {
      this.video.current.play();
    }
  };
  snapPhoto = () => {
    let context = this.canvas.current.getContext("2d");
    context.canvas.width = this.state.width;
    context.canvas.height = this.state.width;
    context.drawImage(
      this.video.current,
      0,
      0,
      Math.round(this.state.width * 1.70048309),
      Math.round(this.state.width * 1.70048309),
      0,
      0,
      this.state.width,
      this.state.width
    );
    context.drawImage(
      this.logo.current,
      this.state.left,
      this.state.top,
      this.state.width / 3,
      this.state.width / 3
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
    const { ready, width, touched, snapped, playing } = this.state;
    const squareLogoSize = `${Math.round(width / 3)}px`;
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
          <img src={logoedLogo} alt='Logoed Logo' style={{ height: "8vh" }} />
        </Header>
        <VideoWrapper
          hidden={snapped}
          videoWidth={width}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleTouchEnd}>
          <Logo
            ref={this.logo}
            className='logo'
            src={businesses[this.props.business].logo}
            alt='Businesses logo'
            ready={ready}
            moving={touched}
            width={squareLogoSize}
            height={squareLogoSize}
          />
          <Video ref={this.video} autoplay playsInline>
            Video stream not yet available ...
          </Video>
        </VideoWrapper>
        <Image
          show={snapped}
          src={data}
          alt='camera view plus logo'
          videoWidth={width}
        />
        <ActionBar>
          {playing ? (
            <CameraButton onClick={() => this.snapPhoto()} />
          ) : (
            <Instructions>Tap and drag to place logo!</Instructions>
          )}
        </ActionBar>
        <canvas
          ref={this.canvas}
          style={{
            width: `${width}px`,
            height: `${width}px`,
            display: "none"
          }}
        />
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
