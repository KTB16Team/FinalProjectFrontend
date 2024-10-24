import {Link} from "react-router-dom";
import CancelLogo from "@/assets/imgs/Cancel.svg?react";
interface CancelButtonProps {
  url: string;
}

export default function CancelButton({url}: CancelButtonProps) {
  return (
    <Link to={url}>
      <CancelLogo width={20}/>
    </Link>
  );
}