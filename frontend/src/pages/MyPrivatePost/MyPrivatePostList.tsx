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
import {useModal} from "@/contexts/ModalContext.tsx";

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
  const { showModal } = useModal();

  // 포스트 목록 조회
  const fetchPosts = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await getMyPrivatePosts(page, 10);
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.content]);
      setTotalPages(response.data.data.totalPages);
    } catch {
      showModal("포스트를 불러오는 중 오류 발생", () => {});
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
           showModal("서버에서 오류가 발생했습니다.", () => {});
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="내 개인글"
        leftButton={<GoBackButton to={"/categories"} />}
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
