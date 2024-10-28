import {useContext, useEffect, useState, useRef, useCallback} from 'react';
import Header from "@/components/Header/Header.tsx";
import {deleteMyPrivatePost, getMyPrivatePosts} from "@/apis/post.ts";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {MyPrivatePostForm} from "@/types/myPrivatePostForm.ts";
import MyPrivatePostItem from "@/components/MyPrivatePost/MyPrivatePostItem.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";

export default function MyPrivatePostList() {
  const [posts, setPosts] = useState<MyPrivatePostForm[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {refreshAccessToken, logout} = useContext(AuthContext)!;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // 포스트 목록 조회
  const fetchPosts = useCallback(async (pageNumber: number) => {
    setLoading(true);
    getMyPrivatePosts(pageNumber, 10)
      .then((response) => {
        // 더미 데이터
        const myPrivatePosts: MyPrivatePostForm[] = [
          {
            post_id: 1,
            title: "Introduction to AI-Powered Voice Transcription",
            content_preview: "Explore how AI can convert voice recordings into accurate text transcriptions...",
            origin_type: 'VOICE',
            created_at: "2024-10-24T08:30:00Z",
            published: true
          },
          {
            post_id: 2,
            title: "Effective Spring Backend Development",
            content_preview: "Learn about best practices in developing backend applications using Spring...",
            origin_type: 'TEXT',
            created_at: "2024-10-23T12:45:00Z",
            published: false
          },
          {
            post_id: 3,
            title: "Optimizing Chatbots for User Engagement",
            content_preview: "Discover techniques for enhancing chatbot interactions to improve user retention...",
            origin_type: 'CHAT',
            created_at: "2024-10-22T15:00:00Z",
            published: true
          },
          {
            post_id: 4,
            title: "Understanding Asynchronous Processing in Java",
            content_preview: "A deep dive into using Mono for asynchronous processing over traditional methods...",
            origin_type: 'TEXT',
            created_at: "2024-10-21T10:30:00Z",
            published: true
          },
          {
            post_id: 5,
            title: "Voice AI: Transcription and Analysis",
            content_preview: "An overview of AI-based voice transcription systems and their applications...",
            origin_type: 'VOICE',
            created_at: "2024-10-20T09:00:00Z",
            published: false
          }
        ];

        // setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        setPosts((prevPosts) => [...prevPosts, ...myPrivatePosts]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.code === "AUTH_001") {
          navigate('/login');
        } else if (error.response.data.code === "AUTH_003") {
          const newAccessToken = refreshAccessToken();
          if (newAccessToken != null) {
            fetchPosts(pageNumber);
          } else {
            logout();
          }
        } else {
          console.error("서버에서 오류가 발생했습니다.");
        }
      });
  }, [navigate, refreshAccessToken, logout]);

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

  const deletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== id));
    deleteMyPrivatePost(id)
      .catch((error) => {
        if (error.response.data.code === "AUTH_001") {
          navigate('/login');
        } else if (error.response.data.code === "AUTH_003") {
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
    <div>
      <Header title="내 개인 글" leftButton={<GoBackButton url="/categories"/>}/>
      <div
        className="bg-background w-full p-3"
        style={{
          height: '85vh',
          overflowY: 'scroll',
          marginTop: '15vh',
        }}
      >
        {posts.map((post) => (
          <MyPrivatePostItem key={post.post_id} post={post} onDelete={deletePost}/>
        ))}
        <div id="scroll-end" style={{height: '1px'}}/>
        {loading && <p className="text-center">Loading...</p>}
      </div>
    </div>

  );
};
