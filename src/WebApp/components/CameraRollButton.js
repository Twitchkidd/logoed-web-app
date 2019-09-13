import React, { Component } from "react";
import styled from "styled-components";
import { eigengrau } from "../../utilities";

// TODO pass in the onchange function!

const CameraRollLabel = styled.label`
  display: inline-block;
  width: 64px;
  height: 64px;
  background: ${eigengrau};
`;

const CameraRollInput = styled.input`
  display: none;
`;

export class CameraRollButton extends Component {
  render() {
    const { upload } = this.props;
    return (
      <CameraRollLabel>
        <CameraRollInput type='file' accept='image/*' onChange={upload} />
      </CameraRollLabel>
    );
  }
}
