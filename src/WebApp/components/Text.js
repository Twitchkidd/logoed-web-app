import styled from "styled-components";
import {
  blue,
  eigengrau,
  crayGray,
  instagram,
  mostlyWhite,
  sans,
  serif
} from "../../utilities";

export const BiggerPresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.675em;
  line-height: 1.25em;
`;

export const PresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.375em;
  line-height: 1.15384615em;
`;

export const InstructionalText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.13636364em;
  ${props => (props.actionBar ? "max-width: 60vw;" : null)}
  text-align: center;
`;

export const InformationalText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.11111111em;
  text-align: center;
`;

export const ButtonText = styled.span`
  ${sans}
  color: ${props =>
    props.disabled ? crayGray : props.primary ? mostlyWhite : blue};
  font-size: 1.125em;
  font-weight: 600;
  line-height: 1.13636364em;
  text-decoration: none;
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

export const ToSLink = styled.button`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1em;
  line-height: 1.15em;
  border: none;
`;

export const TooltipText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.2em;
`;

export const InstagramText = styled.span`
  ${instagram}
  font-weight: ${props => (props.handle ? 500 : 400)};
  color: ${props => (props.atMention ? blue : eigengrau)};
  font-size: 1.375em;
  line-height: 1.13636364em;
`;
