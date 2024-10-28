import {Link} from "react-router-dom";

interface CategoryMenuItemProps {
  name: string;
  path: string;
}

export default function PostCategoryItem({name, path}: CategoryMenuItemProps) {
  return (
    <Link className="block rounded-lg bg-white mb-1 p-4 text-left" to={path} state={{categoryName: name}}>
        {name}
    </Link>
  );
}