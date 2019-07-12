import React, { Component, createRef } from "react";
import styled from "styled-components";
import { Button } from "../components";
import { fixedViewUnits } from "../../utilities";

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
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.videoWidth}px;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    background: url(${props => props.businessLogo});
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const StyledVideo = styled.video`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  object-fit: cover;
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
    playing: false,
    width: 0,
    height: 0
  };
  componentDidMount() {
    this.launchPermissionPrompt();
    console.log(businesses[this.props.business].name);
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
    if (this.state.os === "ios" && this.state.playing === false) {
      this.video.current.play();
      this.setState({ playing: true });
    } else {
      this.snapPhoto();
    }
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
  render() {
    console.log(this.state);
    return (
      <CameraWrapper>
        <VideoWrapper
          videoWidth={this.state.width}
          businessLogo={businesses[this.props.business].logo}>
          <StyledVideo ref={this.video} autoplay playsInline>
            Video stream not yet available ...
          </StyledVideo>
        </VideoWrapper>
        <CameraButton onClick={() => this.buttonFunction()} />
        <canvas
          ref={this.canvas}
          style={{
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
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
