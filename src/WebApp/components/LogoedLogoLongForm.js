import styled from "styled-components";

export const LogoedLogoLongForm = styled.img`
  ${props =>
    props.header ? `height: 5vh;` : `margin-top: 1em; max-width: 80vw;`}
`;
