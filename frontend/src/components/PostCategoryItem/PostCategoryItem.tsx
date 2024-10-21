import {Link} from "react-router-dom";

interface CategoryMenuItemProps {
  name: string;
  path: string;
}

export default function PostCategoryItem({name, path}: CategoryMenuItemProps) {
  return (
    <li key={path}>
      <Link to={path} state={{categoryName: name}}>
        {name}
      </Link>
    </li>
  );
}