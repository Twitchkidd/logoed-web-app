import styled from "styled-components";
import {
  crayGray,
  blue,
  serif,
  sans,
  mostlyWhite,
  eigengrau
} from "../../utilities";

export const Heading = styled.h1`
  ${serif}
  color: ${eigengrau};
  font-size: 2em;
  line-height: 1.25em;
`;

export const PresentationalText = styled.p`
  ${sans}
  color: ${eigengrau};
  font-size: 1.375em;
  line-height: 1.15384615em;
`;

export const ButtonText = styled.span`
  ${sans}
  color: ${props =>
    props.disabled ? crayGray : props.primary ? mostlyWhite : blue};
  font-size: 1.125em;
  font-weight: 600;
  line-height: 1.14em;
`;

export const TagLine = styled.p`
  ${sans}
  font-size: 22;
  line-height: 1.25em;
  color: ${mostlyWhite};
`;

/*
export const H1 = styled.h1`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 2em;
  line-height: 1.25em;
`;

export const H2 = styled.h2`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.625em;
  line-height: 1.15384615em;
`;

export const H3 = styled.h3`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.375em;
  line-height: 1.13636364em;
`;

export const H4 = styled.h4`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.11111111em;
`;

export const P = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1em;
  line-height: 1.25em;
`;
*/
