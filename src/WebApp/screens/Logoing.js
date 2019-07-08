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
  ${fixedViewUnits({ x: 40, y: 85 })}
`;

const CameraWrapper = styled.div`
  height: 100vh;
`;

const StyledVideo = styled.video`
  width: 100%;
`;

export default class Logoing extends Component {
  constructor(props) {
    super(props);
    this.video = createRef();
  }
  launchPermissionPrompt = () => {
    // Todo: return permission to parent component, build into the logic if you think it's Safari, add another button for go mode
    if (navigator.mediaDevices.getUserMedia) {
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
        })
        .catch(err => {
          console.log(err);
          this.props.noPermission();
        });
    } else {
      navigator.getUserMedia(
        { video: true },
        stream => {
          this.video.current.srcObject = stream;
          this.video.current.play();
        },
        function() {
          console.log("Webcam unavailable");
        }
      );
    }
  };
  componentDidMount() {
    this.launchPermissionPrompt();
  }
  render() {
    return (
      <CameraWrapper>
        <StyledVideo ref={this.video} autoplay playsInline>
          Video stream not yet available ...
        </StyledVideo>
        <CameraButton onClick={() => this.video.current.play()} />
      </CameraWrapper>
    );
  }
}

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
