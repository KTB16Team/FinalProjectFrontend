import {useLocation} from "react-router-dom";
import {Post} from "@/types/post.ts";
import PostItem from "@/components/PostItem/PostItem.tsx";

const posts: Post[] = [
  {
    id: 1,
    name: "리엑트 선생님",
    content: "리엑트의 기본 개념을 배워봅시다!",
    createdAt: "2024-10-21 14:00",
    views: 150,
    likes: 20,
    comments: 5,
  },
  {
    id: 2,
    name: "타입스크립트 고수",
    content: "타입스크립트를 사용하면 안전한 코딩을 할 수 있어요.",
    createdAt: "2024-10-20 10:00",
    views: 200,
    likes: 35,
    comments: 8,
  },
];

export default function PostList() {
  const location = useLocation();
  const {categoryName} = location.state;


  return (
    <div>
      <h1>{categoryName}</h1>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}/>
      ))}
    </div>
  );
}