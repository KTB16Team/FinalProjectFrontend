import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "@/components/Header/Header.tsx";
import {deleteMyPrivatePost, getMyPrivatePosts} from "@/apis/post.ts";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {MyPrivatePostPreviewForm} from "@/types/myPrivatePostForm.ts";
import MyPrivatePostItem from "@/components/MyPrivatePost/MyPrivatePostItem.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import Body from "@/components/Body/Body.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import FloatingButton from "@/components/Button/FloatingButton.tsx";

export default function MyPrivatePostList() {
  const [posts, setPosts] = useState<MyPrivatePostPreviewForm[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { refreshAccessToken, logout } = useContext(AuthContext)!;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const [showActions, setShowActions] = useState(false);

  // 포스트 목록 조회
  const fetchPosts = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await getMyPrivatePosts(page, 10);
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.content]);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("포스트를 불러오는 중 오류 발생", error);
    } finally {
      setLoading(false);
    }
  }, [loading, totalPages]);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

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

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    if (scrollEndRef.current) {
      observerRef.current.observe(scrollEndRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [handleObserver]);

  const deletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.privatePostId !== id));
    deleteMyPrivatePost(id)
      .catch((error) => {
        if (error.response?.data?.code === "AUTH_001") {
          navigate('/login');
        } else if (error.response?.data?.code === "AUTH_003") {
          const newAccessToken = refreshAccessToken();
          if (newAccessToken != null) {
            deletePost(id);
          } else {
            logout();
          }
        } else {
          console.error("서버에서 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="내 개인글"
        leftButton={<GoBackButton />}
        rightButton={
          <div className="relative p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        }
      />

      <Body>
        {posts.map((post, index) => (
          <MyPrivatePostItem
            key={index}
            post={post}
            onDelete={deletePost}
          />
        ))}
        {loading && <Loading/>}
        <div ref={scrollEndRef} style={{height: '1px'}}/>
      </Body>

      <FloatingButton showActions={showActions} onToggleActions={() => setShowActions(!showActions)} />
    </div>
  );
}
