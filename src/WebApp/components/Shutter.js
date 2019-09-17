import styled from "styled-components";
import { eigengrau, grayGray, maroon } from "../../utilities";

export const Shutter = styled.button`
  display: inline-block;
  width: ${props => (props.pressed ? `68px` : `64px`)};
  height: ${props => (props.pressed ? `68px` : `64px`)};
  border-radius: 50%;
  border: 2px solid ${props => (props.disabled ? grayGray : eigengrau)};
  padding: ${props => (props.pressed ? `2px` : `4px`)};
  background: ${props => (props.disabled ? grayGray : maroon)};
`;

// TODO easing function, transition, padding? Will that give it the feel of a shutter?
