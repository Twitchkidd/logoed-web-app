import styled from 'styled-components';

export const BuffMcBigBox = styled.div`
  grid-column: 1 / span 1;
  grid-row: ${props => (props.signUpMode ? "1 / span 1" : "2 / span 2")};
  background-color: #253047;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;