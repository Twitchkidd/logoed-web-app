import styled, { css } from "styled-components";
import { elevation } from "../../utilities";

const logoingMixin = css`
  width: 31vw;
  height: 31vw;
  position: absolute;
  transition: opacity 1.8s;
  opacity: ${props => (props.moving ? 0.6 : 1.0)};
  z-index: 8000;
`;

const actionBarMixin = css`
  width: 23vw;
  height: 23vw;
  ${elevation[1]};
`;

export const BusinessLogo = styled.img`
  width: 65vw;
  height: 65vw;
  ${props => (props.logoing ? logoingMixin : null)}
  ${props => (props.actionBar ? actionBarMixin : null)}
`;
