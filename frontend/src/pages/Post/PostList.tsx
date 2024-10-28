import {useLocation, useNavigate} from "react-router-dom";
import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import PostItem from "@/components/Post/PostItem.tsx";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {getPosts, getMyPrivatePosts} from "@/apis/post.ts"; // Add relevant APIs for each path

const FETCH_SIZE = 10;

const mockPosts: PostPreviewForm[] = [
  {
    post_id: 1,
    title: "Mock Title 1",
    content_preview: "This is a preview of the first post's content.",
    created_at: "2024-10-21 14:00",
    views: 150,
    likes: 20,
    comments_count: 5,
    vote_rate_plaintiff: 55.5,
    vote_rate_defendant: 44.5,
  },
  {
    post_id: 2,
    title: "Mock Title 2",
    content_preview: "Preview content for the second post with interesting insights.",
    created_at: "2024-10-20 10:00",
    views: 200,
    likes: 35,
    comments_count: 8,
    vote_rate_plaintiff: 70.0,
    vote_rate_defendant: 30.0,
  },
  // Additional mock posts can be added here
];

export default function PostList() {
  const location = useLocation();
  const navigate = useNavigate();
  const {categoryName} = location.state;

  const [posts, setPosts] = useState<PostPreviewForm[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const {refreshAccessToken, logout} = useContext(AuthContext)!;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Map category names to API calls
  const fetchPosts = useCallback(async (page: number) => {
      setLoading(true);
      try {
        const response = mockPosts;
        // switch (location.pathname) {
        //   case "/my-public-posts":
        //     response = await getPosts("MY", FETCH_SIZE, page);
        //     break;
        //   case "/my-private-posts":
        //     response = await getMyPrivatePosts(FETCH_SIZE, page);
        //     break;
        //   case "/categories/commented-posts":
        //     response = await getPosts("COMMENTED", page, FETCH_SIZE);
        //     break;
        //   case "/categories/popular-posts":
        //     response = await getPosts("POPULAR", page, FETCH_SIZE);
        //     break;
        //   case "/categories/all-posts":
        //   default:
        //     response = await getPosts("ALL", page, FETCH_SIZE);
        //     break;
        // }

        // setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        // setTotalPages(response.data.totalPages);

        setPosts((prevPosts) => [...prevPosts, ...response]);
        setTotalPages(1);
      } catch (error) {
        if (error.response?.data.code === "AUTH_001") {
          navigate("/login");
        } else if (error.response?.data.code === "AUTH_003") {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            fetchPosts(page); // Retry after token refresh
          } else {
            logout();
          }
        } else {
          console.error("Server error occurred.");
        }
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
      <Header title={categoryName} leftButton={<GoBackButton url="/categories"/>}/>
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh",
        }}
      >
        {posts.map((post) => (
          <PostItem key={post.post_id} post={post}/>
        ))}
        <div id="scroll-end" style={{height: '1px'}}/>
        {loading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
}
