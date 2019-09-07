import styled, { css } from "styled-components";
import {
  blue,
  eigengrau,
  elevation,
  grayGray,
  mostlyWhite
} from "../../utilities";

const buttonMcBigHugeMixin = css`
  width: 334px;
  height: 120px;
`;

export const Button = styled.button`
  width: 80px;
  height: 80px;
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
      ? `${grayGray}`
      : `${eigengrau}`};
  background: ${props => (props.primary ? `${blue}` : `${mostlyWhite}`)};
  border: ${props => (props.secondary ? `2px solid ${blue}` : null)};
  ${props => (props.buttonMcBigHuge ? buttonMcBigHugeMixin : null)}
`;
