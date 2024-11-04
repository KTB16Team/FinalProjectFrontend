import {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import Header from "@/components/Header/Header.tsx";
import {useNavigate} from 'react-router-dom';
import MicIcon from "@/assets/imgs/Mic.svg";
import MenuButton from "@/components/Button/MenuButton.tsx";
import BellButton from "@/components/Button/BellButton.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
import MyPublicItem from "@/components/Home/SliderItem/MyPublicItem.tsx";

// 슬라이더 설정 수정
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};


export default function () {
  const [popularPosts, setPopularPosts] = useState<PostPreviewForm[]>([]);
  const [allPosts, setAllPosts] = useState<PostPreviewForm[]>([]);
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 데이터 설정
    const dummyPopularPosts: PostPreviewForm[] = [
      {
        postId: 1,
        title: '부장 vs. 차장',
        contentPreview: '사인 부장님이랑 라이언 차장님이 회의를 하다가 싸웠어요. 대리인 저는 누구 편을 들어야할까요? 이럴때마다 너무 고통스러워 어떡해야할지 모르겠고 분위기 메이커로 사는...',
        createdAt: '24.10.26. 19:35',
        viewsCount: 475,
        likesCount: 999,
        commentsCount: 81,
        voteRatePlaintiff: 45,
        voteRateDefendant: 55
      },
      {
        postId: 2,
        title: '인기 글 2',
        contentPreview: '내용...',
        createdAt: '24.10.01. 10:35',
        viewsCount: 30,
        likesCount: 400,
        commentsCount: 15,
        voteRatePlaintiff: 10,
        voteRateDefendant: 90
      },
      {
        postId: 3,
        title: '인기 글 3',
        contentPreview: '내용...',
        createdAt: '24.10.27. 20:35',
        viewsCount: 30,
        likesCount: 300,
        commentsCount: 10,
        voteRatePlaintiff: 10,
        voteRateDefendant: 90
      },
    ];

    const dummyAllPosts: PostPreviewForm[] = [
      {
        postId: 4,
        title: '깻잎논쟁',
        contentPreview: '아니 애인이 새우를 까서 앞사람한테 까줬는데 어쩌구...',
        createdAt: '4:42',
        viewsCount: 30,
        likesCount: 25,
        commentsCount: 10,
        voteRatePlaintiff: 60,
        voteRateDefendant: 40
      },
      {
        postId: 5,
        title: '전체 글 2',
        contentPreview: '내용...',
        createdAt: '4:42',
        viewsCount: 30,
        likesCount: 15,
        commentsCount: 5,
        voteRatePlaintiff: 10,
        voteRateDefendant: 90
      },
      {
        postId: 6,
        title: '전체 글 2',
        contentPreview: '내용...',
        createdAt: '4:42',
        viewsCount: 30,
        likesCount: 15,
        commentsCount: 5,
        voteRatePlaintiff: 10,
        voteRateDefendant: 90
      },
    ];

    setPopularPosts(dummyPopularPosts);
    setAllPosts(dummyAllPosts);
  }, []);


  return (
    <div className={`relative ${showActions ? "bg-black bg-opacity-50" : ""}`}>
      {/* 커스텀 헤더 */}
      <Header
        title="aimo"
        leftButton={
          <MenuButton/>
        }
        rightButton={
          <BellButton/>
        }
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
                <MyPublicItem post={post} key = {post.postId}/>
              ))}
            </Slider>
          </div>
        </HomepageSection>

        {/* 인기 Top 3 섹션 */}
        <HomepageSection title="🔥 인기 TOP3" url="/categories/popular-posts">
          {popularPosts.map((post, index) => (
            <PopularItem post={post} index={index} key={post.postId}/>
          ))}
        </HomepageSection>

        {/* 전체 글 섹션 */}
        <HomepageSection title={"전체 글"} url={"/categories/all-posts"}>
          {allPosts.map((post) => (
            <AllItem
              key={post.postId}
              post = {post}
            />
          ))}
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
            {/* 마이크 아이콘 */}
            <img src={MicIcon} alt="Mic Icon" className="w-6 h-6"/>
            <span className="absolute text-white text-sm -left-24">실시간 녹음</span>
          </button>
          <button
            onClick={() => navigate('/text-upload')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            {/* 텍스트 T 아이콘 */}
            <span className="text-gray-600 font-bold text-lg">T</span>
            <span className="absolute text-white text-sm -left-24">텍스트 업로드</span>
          </button>
          <button
            onClick={() => alert('파일 업로드 준비 중입니다.')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            {/* 파일+ 아이콘 */}
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8"/>
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
    </div>
  );
}