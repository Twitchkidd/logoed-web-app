import styled, { css } from "styled-components";

export const Logo = styled.div`
  height: ${props => (props.signUpMode ? "114px" : "228px")};
  width: ${props => (props.signUpMode ? "114px" : "228px")};
  position: ${props => (props.signUpMode ? "static" : "absolute")};
  ${props =>
    props.signUpMode
      ? css`
          margin-top: 88px;
        `
      : css`
          left: 20vw;
          top: -114px;
        `}
  z-index: 2;
`;
