import {Link} from "react-router-dom";
import HamburgerLogo from "@/assets/imgs/Hamburger.svg?react";

export default function MenuButton() {

  return (
    <Link to={"/categories"}>
      <HamburgerLogo/>
    </Link>
  );
}