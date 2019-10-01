import styled from "styled-components";
import { darkBlue, eigengrau } from "../../utilities";

export const NavBar = styled.div`
  height: 100vh;
  width: ${props => (props.initialSignUp ? "30vw" : "20vw")};
  background-image: ${`linear-gradient(${darkBlue}, ${eigengrau})`};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
