import {Link} from "react-router-dom";

interface CategoryMenuItemProps {
  name: string;
  path: string;
}

export default function PostCategoryItem({name, path}: CategoryMenuItemProps) {
  return (
    <li>
      <Link to={path}>{name}</Link>
    </li>
  );
}