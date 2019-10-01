import styled from "styled-components";

export const ContentWrapper = styled.main`
  grid-column: ${props => (props.signUpMode ? "3 / span 1" : "2 / span 1")};
  grid-row: ${props => (props.signUpMode ? "1 / span 1" : "1 / span 3")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.signUpMode ? "flex-start" : "flex-end")};
`;
