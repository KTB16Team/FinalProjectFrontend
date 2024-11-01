import {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
// import MyAgendaItem from "@/components/Home/SliderItem/MyAgendaItem.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import Header from "@/components/Header/Header.tsx";
import PostItem from "@/components/Post/PostItem.tsx";
import Post from "@/pages/Post/Post.tsx";
import { useNavigate } from 'react-router-dom';
import MicIcon from "@/assets/imgs/Mic.svg"; 

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
      {post_id: 1, title: '부장 vs. 차장', content_preview: '사인 부장님이랑 라이언 차장님이 회의를 하다가 싸웠어요. 대리인 저는 누구 편을 들어야할까요? 이럴때마다 너무 고통스러워 어떡해야할지 모르겠고 분위기 메이커로 사는...', created_at: '24.10.26. 19:35', views: 475, likes: 999, comments_count: 81, vote_rate_plaintiff: 45, vote_rate_defendant: 55},
      {post_id: 2, title: '인기 글 2', content_preview: '내용...', created_at: '24.10.01. 10:35', views: 30, likes: 400, comments_count: 15, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 3, title: '인기 글 3', content_preview: '내용...', created_at: '24.10.27. 20:35', views: 30, likes: 300, comments_count: 10, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
    ];

    const dummyAllPosts: PostPreviewForm[] = [
      {post_id: 4, title: '깻잎논쟁', content_preview: '아니 애인이 새우를 까서 앞사람한테 까줬는데 어쩌구...', created_at: '4:42', views: 30, likes: 25, comments_count: 10, vote_rate_plaintiff: 60, vote_rate_defendant: 40},
      {post_id: 5, title: '전체 글 2', content_preview: '내용...', created_at: '4:42', views: 30, likes: 15, comments_count: 5, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 6, title: '전체 글 2', content_preview: '내용...', created_at: '4:42', views: 30, likes: 15, comments_count: 5, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
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
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        }
        rightButton={
          <button className="p-2 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        }
      />
      
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh",
        }}
      >
        {/* 내가 쓴 안건 섹션 */}
        <HomepageSection title="내 공개글" url="/categories/my-public-posts">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Slider {...settings}>
              {allPosts.slice(0, 3).map((post) => (
                <div key={post.post_id} className="p-4">
                  <div className="flex items-center mb-4">
                    <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2">커뮤니티</span>
                    <h3 className="text-base font-medium">{post.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 text-left">{post.content_preview}</p>
                  <div className="mt-3 mb-4 h-1 flex w-[calc(100%-2rem)]">
                    <div className="bg-red-400" style={{width: `${post.vote_rate_plaintiff}%`}}/>
                    <div className="bg-blue-400" style={{width: `${post.vote_rate_defendant}%`}}/>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </HomepageSection>

        {/* 인기 Top 3 섹션 */}
        <HomepageSection title="🔥 인기 TOP3" url="/categories/popular-posts">
          {popularPosts.map((post, index) => (
            <div key={post.post_id} className="bg-white p-4 mb-4 -mx-3">
              <div className="flex items-start mt-4">
                <span className="text-xl font-bold text-red-500 mr-3">{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2">커뮤니티</span>
                    <h3 className="text-base font-medium">{post.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-21 mr-4 text-left">{post.content_preview}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                  </div>
                  <div className="mt-3 h-1 flex w-[calc(100%-2rem)]"> {/* 과실비율 그래프 너비 조정 */}
                    <div className="bg-red-400" style={{width: `${post.vote_rate_plaintiff}%`}} />
                    <div className="bg-blue-400" style={{width: `${post.vote_rate_defendant}%`}} />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-3 pr-8">
                  <div className="flex items-center gap-2">
                    <span>{post.created_at}</span>
                    <span>조회 {post.views}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments_count}</span>
                  </div>
                </div>


                 
                </div>
              </div>
            </div>
          ))}
        </HomepageSection>

        <HomepageSection title={"전체 글"} url={"/categories/all-posts"}>
          {allPosts.map((post) => (
            <AllItem
              key={post.post_id}
              id={post.post_id}
              title={post.title}
              likes={post.likes}
              comments={post.comments_count}
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
            <img src={MicIcon} alt="Mic Icon" className="w-6 h-6" />
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