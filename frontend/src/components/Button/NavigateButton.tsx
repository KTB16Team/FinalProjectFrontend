import {Link} from "react-router-dom";

interface NavigateButtonProps {
  url: string;
  title: string;
}

export default function NavigateButton({ url, title }: NavigateButtonProps) {
  return (
    <Link to={url}>
      {title}
    </Link>
  );
}