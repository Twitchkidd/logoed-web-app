import styled from "styled-components";

export const LogoedLogoLongForm = styled.img`
  ${props =>
    props.header
      ? `height: 6vh; display: block; margin-left: auto; margin-right: auto; margin-bottom: 4px;`
      : `margin-top: 1em; max-width: 80vw;`}
`;
