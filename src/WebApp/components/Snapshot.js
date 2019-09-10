import styled from "styled-components";

export const Snapshot = styled.img`
  display: ${props => (props.show ? "block" : "none")};
  width: 100vw;
  height: 100vw;
`;
