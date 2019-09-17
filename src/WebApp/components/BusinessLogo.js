import styled, { css } from "styled-components";
import { elevation } from "../../utilities";

const logoingMixin = css`
  width: 31vw;
  height: 31vw;
  position: absolute;
  transition: opacity 1.8s;
  opacity: ${props => (props.moving ? 0.6 : 1.0)};
`;

const actionBarMixin = css`
  width: 18vw;
  height: 18vw;
  ${elevation[1]};
`;

export const BusinessLogo = styled.img`
  width: 65vw;
  height: 65vw;
  z-index: 9001;
  ${props => (props.logoing ? logoingMixin : null)}
  ${props => (props.actionBar && !props.moving ? actionBarMixin : null)}
`;
