import React, { Component, createRef } from "react";
import imageCompression from "browser-image-compression";
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

export default class Logoing extends Component {
  constructor(props) {
    super(props);
    this.logo = createRef();
    this.shadowLogo = createRef();
    this.video = createRef();
    this.image = createRef();
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
    uploaded: false
  };
  componentDidMount() {
    if (this.props.logoedSnapshot) {
      const {
        top,
        left,
        snapshot,
        logoedSnapshot,
        snapped,
        uploaded
      } = this.props;
      this.setState({
        top,
        left,
        snapshot,
        logoedSnapshot,
        snapped,
        uploaded,
        back: true
      });
    } else {
      this.startCamera();
      this.setLogoInitialPosition();
    }
  }
  // >> LOGO POSITIONING
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
    // const { left, top } = this.props;
    // const width = window.innerWidth;
    // const headerHeight = this.setState({ dragging: false, logoed: true });
    console.log("TODO!");
  };
  // >> CAMERA USAGE
  startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: {
            min: 1080, // This is not the way.
            ideal: 1280 // It was 1080 - 1280 before
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
  //  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  /*
    img	Specifies the image, canvas, or video element to use	 
    sx	Optional. The x coordinate where to start clipping	
    sy	Optional. The y coordinate where to start clipping	
    swidth	Optional. The width of the clipped image	
    sheight	Optional. The height of the clipped image	
    x	The x coordinate where to place the image on the canvas	
    y	The y coordinate where to place the image on the canvas	
    width	Optional. The width of the image to use (stretch or reduce the image)	
    height	Optional. The height of the image to use (stretch or reduce the image)
  */
  paintCanvasStill = source => {
    const width = window.innerWidth;
    let context = this.canvas.current.getContext("2d");
    context.canvas.width = width;
    context.canvas.height = width;
    if (source === "snapped") {
      context.clearRect(0, 0, width, width);
      context.drawImage(
        this.video.current,
        0,
        0,
        Math.round(width * 1.70048309), // ! Clearly this part is fucked up
        Math.round(width * 1.70048309),
        0,
        0,
        width,
        width
      );
    } else if (source === "uploaded") {
      console.log(context);
      console.log("context");
      console.log(width);
      console.log("width");
      console.log(this.image.current);
      console.log("this.image.current");
      context.clearRect(0, 0, width, width);
      context.drawImage(
        this.image.current,
        0,
        0,
        Math.round(width * 1.70048309), // ! Clearly this part is fucked up
        Math.round(width * 1.70048309),
        0,
        0,
        width,
        width
      );
    } else {
      console.log("paintCanvasStill() called improperly!");
    }
  };
  logoCanvas = () => {
    const { left, top } = this.state;
    const width = window.innerWidth;
    let context = this.canvas.current.getContext("2d");
    context.drawImage(this.logo.current, left, top, width * 0.31, width * 0.31);
  };
  createPNG = () => {
    return this.canvas.current.toDataURL("image/png");
  };
  snapPhoto = () => {
    const { stream } = this.state;
    this.paintCanvasStill("snapped");
    let snapshot = this.createPNG();
    this.setState({
      snapshot,
      snapped: true,
      uploaded: false
    });
    stream.getVideoTracks()[0].stop();
  };
  onUpload = async e => {
    const { snapshot, stream } = this.state;
    let file = e.target.files[0];
    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    if (snapshot) {
      let isReplacePhotoConfirmed = window.confirm("Replace photo?");
      if (!isReplacePhotoConfirmed) {
        return;
      }
    }
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: false
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      this.handleCompressedFileFromUpload(compressedFile);
    } catch (err) {
      console.log(err);
    }
    if (stream) {
      stream.getVideoTracks()[0].stop();
    }
  };
  handleCompressedFileFromUpload = compressedFile => {
    console.log("handleCompressedFileFromUpload");
    let reader = new FileReader();
    reader.onloadend = e => {
      let compressedSnapshot = e.target.result;
      this.setState({
        snapshot: compressedSnapshot,
        snapped: false,
        uploaded: true
      });
    };
    reader.readAsDataURL(compressedFile);
  };
  uploadLoads = () => {
    this.paintCanvasStill("uploaded");
  };
  resetImage = () => {
    let isReplacePhotoConfirmed = window.confirm("Replace photo?");
    if (!isReplacePhotoConfirmed) {
      return;
    }
    this.setState({
      snapped: false,
      uploaded: false,
      snapshot: null
    });
    this.startCamera();
  };
  handleShare = () => {
    const { initiateSharing } = this.props;
    this.logoCanvas();
    let logoedSnapshot = this.createPNG();
    this.setState({ logoedSnapshot }, () => {
      const {
        top,
        left,
        snapshot,
        logoedSnapshot,
        snapped,
        uploaded
      } = this.state;
      const data = {
        top,
        left,
        snapshot,
        logoedSnapshot,
        snapped,
        uploaded
      };
      initiateSharing(data);
    });
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
        {snapped ? (
          <SnapshotWrapper>
            <Snapshot
              ref={this.image}
              src={snapshot}
              alt='snapshot hopefully of food, hopefully with a logo on it'
            />
          </SnapshotWrapper>
        ) : uploaded ? (
          <SnapshotWrapper>
            <Snapshot
              ref={this.image}
              src={snapshot}
              alt='snapshot hopefully of food, hopefully with a logo on it'
              onLoad={this.uploadLoads}
            />
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
