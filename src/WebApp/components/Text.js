import styled from "styled-components";
import { blue, grayGray, mostlyWhite, eigengrau } from "../../utilities";

const serif = `
  font-family: "Bree Serif", serif;
`;

const sans = `
  font-family: "Open Sans", sans-serif;
`;

export const BiggerPresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 2em;
  line-height: 1.25em;
`;

export const PresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.625em;
  line-height: 1.15384615em;
`;

export const InstructionalText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.375em;
  line-height: 1.13636364em;
`;

export const InformationalText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.11111111em;
`;

export const ButtonText = styled.span`
  ${sans}
  color: ${props =>
    props.disabled ? grayGray : props.primary ? mostlyWhite : blue};
  font-size: 1.375em;
  font-weight: 600;
  line-height: 1.13636364em;
`;
// Was 1.125 as of Button.Text version ... checkPlz ...

export const ToSH1 = styled.h1`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 2em;
  line-height: 1.25em;
`;

export const ToSH2 = styled.h2`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.625em;
  line-height: 1.15384615em;
`;

export const ToSH3 = styled.h3`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.375em;
  line-height: 1.13636364em;
`;

export const ToSP = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1em;
  line-height: 1.25em;
`;
