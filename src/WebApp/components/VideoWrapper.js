import styled from "styled-components";

export const VideoWrapper = styled.div`
  position: relative;
  height: 414px;
  display: ${props => (props.hidden ? "none" : "block")};
  z-index: 5;
  overflow: hidden;
  width: 100%;
`;
// height: 100vw;
