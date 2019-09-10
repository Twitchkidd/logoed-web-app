import styled from "styled-components";

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vw;
  overflow: hidden;
  display: ${props => (props.hidden ? "none" : "block")};
`;
