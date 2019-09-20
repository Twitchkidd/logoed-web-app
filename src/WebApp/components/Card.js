import styled from "styled-components";
import { elevation, mostlyWhite } from "../../utilities";

export const Card = styled.div`
  background: ${mostlyWhite};
  width: 364px;
  height: 364px;
  ${elevation[1]};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
