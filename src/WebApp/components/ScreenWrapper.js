import styled from "styled-components";
import { lightOrange, darkOrange } from "../../utilities";

// safariFix was a call to window.innerHeight, still looking for an answer there.
export const ScreenWrapper = styled.div`
  height: ${props => (props.safariFix ? `${props.safariFix}px` : "100vh")};
  width: ${props => (props.gradient ? "auto" : "100vw")};
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.gradient ? "space-around" : "flex-start")};
  align-items: ${props => (props.gradient ? "center" : "stretch")};
  overflow: hidden;
  background-image: ${props =>
    props.gradient ? `linear-gradient(${lightOrange}, ${darkOrange})` : null};
  background-color: #fbfafa;
  position: relative;
`;
