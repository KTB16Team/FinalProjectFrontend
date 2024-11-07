import { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import { PostPreviewForm } from "@/types/postPreviewForm.ts";
import Header from "@/components/Header/Header.tsx";
import { useNavigate } from 'react-router-dom';
import MicIcon from "@/assets/imgs/Mic.svg";
import MenuButton from "@/components/Button/MenuButton.tsx";
import BellButton from "@/components/Button/BellButton.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
import MyPublicItem from "@/components/Home/SliderItem/MyPublicItem.tsx";
import { getPosts } from "@/apis/post.ts";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function Home() {
  const [popularPosts, setPopularPosts] = useState<PostPreviewForm[]>([]);
  const [allPosts, setAllPosts] = useState<PostPreviewForm[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showActions, setShowActions] = useState(false);
  const [page, setPage] = useState(0); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMyPublicPosts();
    fetchPopularPosts();
  }, []);

  useEffect(() => {
    if (page == 0 || page < totalPages) {
      fetchAllPosts();
    }
  }, [page]);

  useEffect(() => {
    if (!targetRef.current || page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [isLoading, page, totalPages]);

  const fetchPopularPosts = () => {
    getPosts("POPULAR", 0, 3)
      .then((response) => {
        setPopularPosts(response.data.data.content);
      });
  };

  const fetchAllPosts = () => {
    setIsLoading(true);
    getPosts("ANY", page, 10)
      .then((response) => {
        setAllPosts((prevPosts) => [...prevPosts, ...response.data.data.content]); // 기존 데이터에 추가
        setTotalPages(response.data.data.totalPages);
        setIsLoading(false);
      });
  };

  const fetchMyPublicPosts = () => {
    getPosts("MY", 0, 3)
      .then((response) => {
        setPopularPosts(response.data.data.content);
      });
  };

  return (
    <div className={`relative ${showActions ? "bg-black bg-opacity-50" : ""}`}>
      {/* 커스텀 헤더 */}
      <Header
        title="aimo"
        leftButton={<MenuButton />}
        rightButton={<BellButton />}
      />
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh",
        }}
      >
        {/* 내 공개글 섹션 */}
        <HomepageSection title="내 공개글" url="/categories/my-public-posts">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Slider {...settings}>
              {allPosts.slice(0, 3).map((post) => (
                <MyPublicItem post={post} key={post.id} />
              ))}
            </Slider>
          </div>
        </HomepageSection>

        {/* 인기 Top 3 섹션 */}
        <HomepageSection title="🔥 인기 TOP3" url="/categories/popular-posts">
          {popularPosts.map((post, index) => (
            <PopularItem post={post} index={index} key={index} />
          ))}
        </HomepageSection>

        {/* 전체 글 섹션 */}
        <HomepageSection title={"전체 글"} url={"/categories/all-posts"}>
          {allPosts.map((post, index) => (
            <AllItem key={index} post={post} />
          ))}
          {isLoading && <p className="text-center mt-4">로딩 중...</p>}
          {!isLoading && page < totalPages && (
            <div ref={targetRef} className="w-full h-10"></div>
          )}
        </HomepageSection>
      </div>

      {/* 오버레이 및 플로팅 버튼 */}
      {showActions && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setShowActions(false)}
        ></div>
      )}

      {/* Floating Action Buttons */}
      {showActions && (
        <div className="fixed bottom-24 right-4 flex flex-col items-center space-y-3 z-50">
          <button
            onClick={() => navigate('/audio-recorder')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative"
          >
            <img src={MicIcon} alt="Mic Icon" className="w-6 h-6" />
            <span className="absolute text-white text-sm -left-24">실시간 녹음</span>
          </button>
          <button
            onClick={() => navigate('/text-upload')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            <span className="text-gray-600 font-bold text-lg">T</span>
            <span className="absolute text-white text-sm -left-24">텍스트 업로드</span>
          </button>
          <button
            onClick={() => alert('파일 업로드 준비 중입니다.')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
            </svg>
            <span className="absolute text-white text-sm -left-24">파일 업로드</span>
          </button>
        </div>
      )}

      <button
        className="fixed bottom-4 right-4 w-14 h-14 bg-red-400 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-500 transition-colors z-50"
        onClick={() => setShowActions(!showActions)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
