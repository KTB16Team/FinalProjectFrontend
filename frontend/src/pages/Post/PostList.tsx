import {useLocation} from "react-router-dom";
import {PostPreviewForm} from "@/types/postForm.ts";
import PostItem from "@/components/Post/PostItem.tsx";
import Header from "@/components/Header/Header.tsx";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {getPosts} from "@/apis/post.ts";
import {CATEGORY_NAMES} from "@/constants/categoryName.ts";
import Body from "@/components/Body/Body.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";

const FETCH_SIZE = 10;

interface PostResponse {
  data: {
    data: {
      content: PostPreviewForm[];
      totalPages: number;
    };
  };
}

export default function PostList() {
  const location = useLocation();

  const [posts, setPosts] = useState<PostPreviewForm[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const {refreshAccessToken, logout} = useContext(AuthContext)!;
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page == 0 || page < totalPages) {
      fetchPosts(page);
    }
  }, [page]);

  const categoryName = CATEGORY_NAMES[location.pathname] || "게시판";

  const fetchPosts = useCallback(
    async (page: number) => {
      setLoading(true);
      let response: PostResponse;
      try {
        switch (location.pathname) {
          case "/my-public-posts":
            response = await getPosts("MY", page, FETCH_SIZE);
            break;
          case "/categories/commented-posts":
            response = await getPosts("COMMENTED", page, FETCH_SIZE);
            break;
          case "/categories/popular-posts":
            response = await getPosts("POPULAR", page, FETCH_SIZE);
            break;
          case "/categories/all-posts":
          default:
            response = await getPosts("ANY", page, FETCH_SIZE);
            break;
        }
        setPosts((prevPosts) => [...prevPosts, ...response.data.data.content]);
        setTotalPages(response.data.data.totalPages);
      } finally {
        setLoading(false);
      }
    },
    [location.pathname, refreshAccessToken, logout]
  );

  // 무한 스크롤
  useEffect(() => {
    if (!targetRef.current || page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    const currentTarget = targetRef.current;
    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [loading, page, totalPages]);

  return (
    <div>
      <Header title={categoryName} leftButton={<GoBackButton to={"/categories"}/>}/>
      <Body
        className="bg-background"
      >
        {posts.map((post, index) => (
          <PostItem key={index} post={post}/>
        ))}
        {loading && <Loading/>}
        {!loading && page < totalPages && <div ref={targetRef} className="w-full h-10"/>}
      </Body>
    </div>
  );
}
