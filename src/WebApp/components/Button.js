import React, { Component } from "react";
import styled, { css } from "styled-components";
import {
  blue,
  eigengrau,
  elevation,
  crayGray,
  grayGray,
  mostlyWhite
} from "../../utilities";

const buttonMcBigHugeMixin = css`
  width: 80vw;
  height: 96px;
`;

const StyledButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  ${elevation[1]};
  color: ${props =>
    props.primary
      ? `${mostlyWhite}`
      : props.secondary
      ? `${blue}`
      : props.disabled
      ? `${crayGray}`
      : `${eigengrau}`};
  background: ${props =>
    props.primary
      ? `${blue}`
      : props.pressed
      ? `${grayGray}`
      : `${mostlyWhite}`};
  border: ${props => (props.secondary ? `2px solid ${blue}` : `none`)};
  ${props => (props.buttonMcBigHuge ? buttonMcBigHugeMixin : null)}
`;

export class Button extends Component {
  state = {
    pressed: false
  };
  onTouchStartButton = () => {
    this.setState({
      pressed: true
    });
  };
  onTouchEndButton = () => {
    this.setState({
      pressed: false
    });
  };
  render() {
    return (
      <StyledButton
        {...this.props}
        onTouchStart={this.onTouchStartButton}
        onTouchEnd={this.onTouchEndButton}
        pressed={this.state.pressed}
      />
    );
  }
}
