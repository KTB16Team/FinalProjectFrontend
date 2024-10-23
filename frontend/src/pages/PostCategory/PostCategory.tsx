import PostCategoryItem from "@/components/PostCategory/PostCategoryItem/PostCategoryItem.tsx";

interface Category {
  name: string;
  path: string;
}

const categories: Category[] = [
  { name: '내가 쓴 글', path: '/my-posts' },
  { name: '댓글 단 글', path: '/commented-posts' },
  { name: '인기 게시판', path: '/popular-posts' },
  { name: '전체 게시판', path: '/all-posts' },
];

export default function PostCategory() {
  return (
    <div>
      <nav>
        <ul>
          {categories.map((category) => (
            <PostCategoryItem
              key={category.path}
              name={category.name}
              path={`/categories${category.path}`}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}