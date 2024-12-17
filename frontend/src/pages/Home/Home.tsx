import {useEffect, useRef, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import {PostPreviewForm} from "@/types/postForm.ts";
import Header from "@/components/Header/Header.tsx";
import MenuButton from "@/components/Button/MenuButton.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
import MyPublicItem from "@/components/Home/SliderItem/MyPublicItem.tsx";
import {getPosts} from "@/apis/post.ts";
import Body from "@/components/Body/Body.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import FloatingButton from "@/components/Button/FloatingButton.tsx";

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
  const [myPublicPosts, setMyPublicPosts] = useState<PostPreviewForm[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showActions, setShowActions] = useState(false);
  const [page, setPage] = useState(0); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
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

  // 무한 스크롤
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

  // 인기게시글 조회
  const fetchPopularPosts = () => {
    getPosts("POPULAR", 0, 3)
      .then((response) => {
        setPopularPosts(response.data.data.content);
      });
  };

  // 전체게시글 조회
  const fetchAllPosts = () => {
    setIsLoading(true);
    getPosts("ANY", page, 10)
      .then((response) => {
        setAllPosts((prevPosts) => [...prevPosts, ...response.data.data.content]); // 기존 데이터에 추가
        setTotalPages(response.data.data.totalPages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 내 공개글 조회
  const fetchMyPublicPosts = () => {
    getPosts("MY", 0, 3)
      .then((response) => {
        setMyPublicPosts(response.data.data.content);
      });
  };

  return (
    <div>
      {/* 커스텀 헤더 */}
      <Header
        title="aimo"
        leftButton={<MenuButton/>}
      />
      <Body className="bg-background">
        {/* 내 공개글 섹션 */}
        <HomepageSection title="내 공개글" url="/categories/my-public-posts">
          <Slider {...settings}>
            {myPublicPosts.slice(0, 3).map((post) => (
              <MyPublicItem post={post} key={post.id}/>
            ))}
          </Slider>
        </HomepageSection>

        {/* 인기 Top 3 섹션 */}
        <HomepageSection title="🔥 인기 TOP3" url="/categories/popular-posts">
          {popularPosts.map((post, index) => (
            <PopularItem post={post} index={index} key={index}/>
          ))}
        </HomepageSection>

        {/* 전체 글 섹션 */}
        <HomepageSection title="전체 글" url="/categories/all-posts">
          {allPosts.map((post, index) => (
            <AllItem key={index} post={post}/>
          ))}
          {isLoading && <Loading/>}
          {!isLoading && page < totalPages && (
            <div ref={targetRef} className="w-full h-10"></div>
          )}
        </HomepageSection>
      </Body>

      <FloatingButton showActions={showActions} onToggleActions={() => setShowActions(!showActions)}/>
    </div>
  );
}
