import styled from "styled-components";
import { lightOrange, darkOrange } from "../../utilities";

export const ScreenWrapper = styled.div`
  height: 100vh;
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
