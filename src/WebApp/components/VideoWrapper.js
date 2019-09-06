import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vw;
  overflow: hidden;
  display: ${props => (props.hidden ? "none" : "block")};
`;

export default VideoWrapper;
