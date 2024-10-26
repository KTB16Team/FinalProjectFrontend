import {Link} from "react-router-dom";
import GoBackButton from "@/assets/imgs/GoBack.svg?react";

interface CancelButtonProps {
  url: string;
}

export default function CancelButton({url}: CancelButtonProps) {
  return (
    <Link to={url}>
      <GoBackButton width={20}/>
    </Link>
  );
}