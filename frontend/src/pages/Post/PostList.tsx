import {useLocation, useNavigate} from "react-router-dom";
import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import PostItem from "@/components/Post/PostItem.tsx";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {getPosts, getMyPrivatePosts} from "@/apis/post.ts";
import {CATEGORY_NAMES} from "@/constants/categoryName.ts"; // Add relevant APIs for each path

const FETCH_SIZE = 10;

interface PostResponse {
  data: {
    data: {
      content: PostPreviewForm[];
    };
    totalPages: number;
  };
}

export default function PostList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostPreviewForm[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const {refreshAccessToken, logout} = useContext(AuthContext)!;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // URL 경로에 맞는 카테고리 이름을 가져오기
  const categoryName = CATEGORY_NAMES[location.pathname] || "게시판";

  // Map category names to API calls
  const fetchPosts = useCallback(async (page: number) => {
      setLoading(true);

      let response: PostResponse;
      try {
        switch (location.pathname) {
          case "/my-public-posts":
            response = await getPosts("MY", page, FETCH_SIZE);
            break;
          case "/my-private-posts":
            response = await getMyPrivatePosts(page, FETCH_SIZE);
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
        setTotalPages(response.data.totalPages);
      } finally {
        setLoading(false);
      }
    },
    [location.pathname, navigate, refreshAccessToken, logout]
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && page + 1 < totalPages && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [page, totalPages, loading]
  );


  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver);
    if (observerRef.current && document.querySelector('#scroll-end')) {
      observerRef.current.observe(document.querySelector('#scroll-end')!);
    }

    return () => observerRef.current?.disconnect();
  }, [handleObserver]);


  return (
    <div>
      <Header title={categoryName} leftButton={<GoBackButton/>}/>
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh",
        }}
      >
        {posts.map((post) => (
          <PostItem key={post.postId} post={post}/>
        ))}
        <div id="scroll-end" style={{height: '1px'}}/>
        {loading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
}
