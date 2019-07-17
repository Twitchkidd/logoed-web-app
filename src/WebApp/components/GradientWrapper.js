import styled from "styled-components";
import { lightOrange, darkOrange } from "../../utilities";

export const GradientWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(${lightOrange}, ${darkOrange});
`;
