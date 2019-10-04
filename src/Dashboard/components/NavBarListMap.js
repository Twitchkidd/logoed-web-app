import { NavBarItem } from "./NavBarItem";
import { NavBarItemText } from "./Text";

export const NavBarListMap = () => {
  const navBarList = ["Stats", "Profile", "Raffle"];
  return (
    <ul>
      {navBarList.map((navBarItem, i) => (
        <NavBarItem key={i}>
          <NavBarItemText>{navBarItem}</NavBarItemText>
        </NavBarItem>
      ))}
    </ul>
  );
};
