import {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
import MyAgendaItem from "@/components/Home/SliderItem/MyAgendaItem.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import Header from "@/components/Header/Header.tsx";
import PostItem from "@/components/Post/PostItem.tsx";
import Post from "@/pages/Post/Post.tsx";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function () {
  const [popularPosts, setPopularPosts] = useState<PostPreviewForm[]>([]);
  const [allPosts, setAllPosts] = useState<PostPreviewForm[]>([]);

  useEffect(() => {
    // 더미 데이터 설정
    const dummyPopularPosts: PostPreviewForm[] = [
      {post_id: 1, title: '인기 글 1', content_preview: '내용...', created_at: '4:42', views: 30, likes: 50, comments_count: 20, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 2, title: '인기 글 2', content_preview: '내용...', created_at: '4:42', views: 30, likes: 40, comments_count: 15, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 3, title: '인기 글 3', content_preview: '내용...', created_at: '4:42', views: 30, likes: 30, comments_count: 10, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
    ];

    const dummyAllPosts: PostPreviewForm[] = [
      {post_id: 4, title: '전체 글 1', content_preview: '내용...', created_at: '4:42', views: 30, likes: 25, comments_count: 10, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 5, title: '전체 글 2', content_preview: '내용...', created_at: '4:42', views: 30, likes: 15, comments_count: 5, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
      {post_id: 6, title: '전체 글 2', content_preview: '내용...', created_at: '4:42', views: 30, likes: 15, comments_count: 5, vote_rate_plaintiff: 10, vote_rate_defendant: 90},
    ];

    setPopularPosts(dummyPopularPosts);
    setAllPosts(dummyAllPosts);
  }, []);


  return (
    <div>
      <Header title={"aimo"} />
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh",
        }}
      >
        {/* 내가 쓴 안건 섹션 */}
        <HomepageSection title={"내 공개글"} url={"/categories/my-public-posts"}>
          <div>
            <Slider {...settings}>
              {allPosts.slice(0, 3).map((post) => (
                <PostItem
                  key={post.post_id}
                  post={post}
                />
              ))}
            </Slider>
          </div>
        </HomepageSection>


        {/* 인기 Top 3 섹션 */}
        <HomepageSection title={"인기 Top 3"} url={"/categories/popular-posts"}>
          {popularPosts.map((post) => (
            <PostItem
              key={post.post_id}
              post={post}
            />
          ))}
        </HomepageSection>


        {/* 전체 글 무한 스크롤 */}
        <HomepageSection title={"전체 글"} url={"/categories/all-posts"}>
          {allPosts.map((post) => (
            <AllItem
              key={post.post_id}
              id={post.post_id}
              title={post.title}
              likes={post.likes}
              comments={post.comments_count}/>
          ))}
        </HomepageSection>
      </div>
    </div>
  );
};

