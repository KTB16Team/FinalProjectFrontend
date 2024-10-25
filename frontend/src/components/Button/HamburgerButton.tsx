import {Link} from "react-router-dom";
import CancelLogo from "@/assets/imgs/Cancel.svg?react";

export default function HamburgerButton() {
  return (
    <Link to={"/categories"}>
      <CancelLogo width={20}/>
    </Link>
  );
}