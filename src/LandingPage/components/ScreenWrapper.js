import styled, { css } from "styled-components";
import { mostlyWhite } from "../../utilities";

const landingGridMixin = css`
  display: grid;
  grid-template-columns: ${props =>
    props.signUpMode ? "290px 1fr 50vw 1fr" : "40vw 1fr 1fr"};
  grid-template-rows: ${props => (props.signUpMode ? "1fr" : "33vh 33vh 34vh")};
`;

export const ScreenWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  ${landingGridMixin}
  background: ${mostlyWhite};
`;
