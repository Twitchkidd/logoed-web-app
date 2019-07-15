import React, { Component, createRef } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Button } from "../components";
import { lightOrange } from "../../utilities";

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
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
  background-image: none;
  background-color: white;
`;
/*
  ${fixedViewUnits({ x: 40, y: 85 })}
*/

const CameraWrapper = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const Header = styled.header`
  width: 100%;
  height: 42px;
  background-color: ${lightOrange};
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.videoWidth}px;
  overflow: hidden;
  touch-action: none;
  &:before {
    content: "";
    position: absolute;
    transition: opacity 1.8s;
    opacity: ${props => (props.ready ? 0.8 : 0.0)};
    background: no-repeat url(${props => props.businessLogo});
    background-size: ${props => props.videoWidth / 3}px;
    border: ${props => (props.moving ? "solid red 2px" : null)};
    top: ${props => props.logoTop}px;
    right: ${props => props.logoRight}px;
    bottom: ${props => props.logoBottom}px;
    left: ${props => props.logoLeft}px;
  }
`;

const StyledVideo = styled.video`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  object-fit: cover;
`;

const ActionBar = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${lightOrange};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*
var draggable = document.getElementById('draggable');
 draggable.addEventListener('touchmove', function(event) {
   var touch = event.targetTouches[0];

   // Place element where the finger is
   draggable.style.left = touch.pageX-25 + 'px';
   draggable.style.top = touch.pageY-25 + 'px';
   event.preventDefault();
 }, false);
 */

export default class Logoing extends Component {
  constructor(props) {
    super(props);
    this.video = createRef();
    this.canvas = createRef();
  }
  state = {
    ready: false,
    playing: false,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  componentDidMount() {
    this.launchPermissionPrompt();
    console.log(businesses[this.props.business].name);
    window.scrollTo(0, 0);
  }
  preventScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo(0, 0);
  };
  launchPermissionPrompt = () => {
    let os;
    if (navigator.vendor === "Apple Computer, Inc.") {
      os = "ios";
    } else if (navigator.vendor === "Google Inc.") {
      os = "android";
    } else {
      console.log("uh-oh");
    }
    // Todo: return permission to parent component, build into the logic if you think it's Safari, add another button for go mode
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: {
            min: 320,
            ideal: 1280
          },
          facingMode: "environment"
        }
      })
      .then(stream => {
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
  };
  buttonFunction = () => {
    this.snapPhoto();
  };
  snapPhoto = () => {
    console.log("boop!");
    let context = this.canvas.current.getContext("2d");
    context.drawImage(
      this.video.current,
      0,
      0,
      this.state.width,
      this.state.height
    );
    let data = this.canvas.current.toDataURL("image/png");
    console.log(data);
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
  handleDrag = e => {
    e.preventDefault();
    this.setState({
      top: Math.round(e.targetTouches[0].clientY),
      right: Math.round(e.targetTouches[0].clientX),
      bottom: Math.round(e.targetTouches[0].clientY),
      left: Math.round(e.targetTouches[0].clientX)
    });
  };
  handleTouchEnd = e => {
    e.preventDefault();
    this.setState({
      touched: false
    });
  };
  render() {
    console.log(this.state);
    const {
      ready,
      width,
      height,
      top,
      right,
      bottom,
      left,
      touched
    } = this.state;
    return (
      <CameraWrapper
        onScroll={this.preventScroll}
        onTouchMove={this.preventScroll}>
        <Helmet>
          <meta
            name='viewport'
            content='user-scalable=no, width=device-width, initial-scale=1.0'
          />
          <meta name='apple-mobile-web-app-capable' content='yes' />
        </Helmet>
        <Header />
        <VideoWrapper
          videoWidth={width}
          businessLogo={businesses[this.props.business].logo}
          ready={ready}
          logoTop={top}
          logoRight={right}
          logoBottom={bottom}
          logoLeft={left}
          moving={touched}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleTouchEnd}>
          <StyledVideo ref={this.video} autoplay playsInline>
            Video stream not yet available ...
          </StyledVideo>
        </VideoWrapper>
        <ActionBar>
          <CameraButton onClick={() => this.buttonFunction()} />
        </ActionBar>
        <canvas
          ref={this.canvas}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            display: "none"
          }}
        />
      </CameraWrapper>
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
