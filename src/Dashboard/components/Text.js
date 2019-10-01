import styled from "styled-components";
import {
  blue,
  eigengrau,
  crayGray,
  instagram,
  lightGray,
  mostlyWhite,
  sans,
  serif
} from "../../utilities";

const fontSizes = ["1em", "1.111em", "1.125em", "1.375em", "1.675em", "2em"];
// 16 .. 17 or 18 ..  18  .. ..   22   .. ..  27  .. ..  32

const lineHeights = [
  "I have no idea why the line heights are like that",
  "I'd gotten this all from an article",
  "but the line heights thing escapes me",
  "so I'm going to just adjust it by eye",
  "TODO!",
  "// UPDATE! Figma just like, *taught* me line heights!",
  "// Basically, a line height of 120% for a font size of ...",
  "// 22px yields a one line text element with a height of 26px!",
  "// It's additive!"
];

export const InstructionalText = styled.p`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.125em;
  line-height: 1.13636364em;
  ${props => (props.actionBar ? "max-width: 60vw;" : null)}
  text-align: center;
`;

export const Brand = styled.p``;

export const BiggerPresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.675em;
  line-height: 1.25em;
`;

export const BusinessName = styled.p`
  ${serif}
  color: ${eigengrau};
  font-size: 1.375em;
  line-height: 1.154em;
`;

export const TagLine = styled.p`
  ${sans}
  font-size: 1.375em;
  line-height: 1.25em;
  color: ${mostlyWhite};
`;

export const PresentationalText = styled.p`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 1.375em;
  line-height: 1.154em;
`;

export const ContactLinkButton = styled.span`
  ${sans}
  font-size: 17;
  line-height: 1.14em;
  transition: color: 0.2s;
  color: ${lightGray};
  :hover {
    color: ${mostlyWhite};
  }
`;

export const NavBarItemText = styled.span`
  ${sans}
  font-size: 22;
  color: ${lightGray};
  opacity: ${props => (props.initialSignUp ? 0.2 : 1.0)};
  :hover {
    color: ${mostlyWhite};
  }
  transition: color 0.2s;
`;

/*
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
  line-height: 1.14em;
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
*/
