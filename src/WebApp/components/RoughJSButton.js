import React, { Component } from "react";
import { blue, eigengrau, grayGray } from "../../utilities";
import ReactRough, { Rectangle } from "react-rough";

/*
 *  <Button wide absolute onClick={() => initiateLogoing()}>
 *    <ButtonText primary style={{ zIndex: 2 }}>
 *      Got it!
 *    </ButtonText>
 *  </Button>
 */

export class Button extends Component {
  state = {
    startX: null,
    startY: null,
    x: null,
    y: null
  };
  handleTouchStart = e => {
    console.log("touch start");
    this.setState({
      startX: e.targetTouches[0].clientX,
      startY: e.targetTouches[0].clientY
    });
  };
  handleTouchMove = e => {
    this.setState({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };
  handleTouchEnd = e => {
    if (
      Math.abs(this.state.startX - this.state.x) <= 10 ||
      Math.abs(this.state.startY - this.state.y) <= 10
    ) {
      this.tap();
    }
  };
  tap = () => {
    this.props.onClick();
  };
  render() {
    let width = this.props.wide
      ? Math.round(window.innerWidth * 0.9)
      : Math.round(window.innerWidth * 0.1);
    let height = Math.round(window.innerWidth * 0.2);
    let position = this.props.absolute ? "absolute" : "static";
    return (
      <button
        style={{
          width: width,
          height: height,
          position: "relative",
          textAlign: "center",
          marginBottom: "15vh",
          display: "flex",
          background: "none",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none"
        }}
        onTouchStart={event => this.handleTouchStart(event)}
        onTouchMove={event => this.handleTouchMove(event)}
        onTouchEnd={event => this.handleTouchEnd(event)}
        onClick={() => this.props.onClick}>
        {this.props.children}
        <div
          style={{
            top: "0px",
            left: "0px",
            position: `${position}`,
            width: `${width}px`,
            height: `${height}px`
          }}>
          <ReactRough width={width} height={height}>
            <Rectangle
              points={[0, 0, width, height]}
              fill={blue}
              fillWeight={3}
            />
          </ReactRough>
        </div>
      </button>
    );
  }
}
