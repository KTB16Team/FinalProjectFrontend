import {useState, useEffect} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from "@/components/Navbar/Navbar.tsx";
import Body from "@/components/Body/Body.tsx";
import HomepageSection from "@/components/Home/HomepageSection/HomepageSection.tsx";
import PopularItem from "@/components/Home/SliderItem/PopularItem.tsx";
import MyAgendaItem from "@/components/Home/SliderItem/MyAgendaItem.tsx";
import AllItem from "@/components/Home/SliderItem/AllItem.tsx";
import {Post} from "@/types/post.ts";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function () {
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 더미 데이터 설정
    const dummyPopularPosts: Post[] = [
      {id: 1, title: '인기 글 1', content: '내용...', createdAt: '4:42', views: 30, likes: 50, comments: 20},
      {id: 2, title: '인기 글 2', content: '내용...', createdAt: '4:42', views: 30, likes: 40, comments: 15},
      {id: 3, title: '인기 글 3', content: '내용...', createdAt: '4:42', views: 30, likes: 30, comments: 10},
    ];

    const dummyAllPosts: Post[] = [
      {id: 4, title: '전체 글 1', content: '내용...', createdAt: '4:42', views: 30, likes: 25, comments: 10},
      {id: 5, title: '전체 글 2', content: '내용...', createdAt: '4:42', views: 30, likes: 15, comments: 5},
      {id: 6, title: '전체 글 2', content: '내용...', createdAt: '4:42', views: 30, likes: 15, comments: 5},
    ];

    setPopularPosts(dummyPopularPosts);
    setAllPosts(dummyAllPosts);
  }, []);


  return (
    <Body>
      <div className="w-full bg-white">
        {/* 내가 쓴 안건 섹션 */}
        <HomepageSection title={"내가 쓴 안건"} url={"/categories/my-agendas"}>
          <div>
            <Slider {...settings}>
              {allPosts.slice(0, 3).map((post) => (
                <MyAgendaItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  views={post.views}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </Slider>
          </div>
        </HomepageSection>


        {/* 인기 Top 3 섹션 */}
        <HomepageSection title={"인기 Top 3"} url={"/categories/popular-posts"}>
          {popularPosts.map((post) => (
            <PopularItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              views={post.views}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </HomepageSection>


        {/* 전체 글 무한 스크롤 */}
        <HomepageSection title={"전체 글"} url={"/categoies/all-posts"}>
          {allPosts.map((post) => (
            <AllItem
              key={post.id}
              id={post.id}
              title={post.title}
              likes={post.likes}
              comments={post.comments}/>
          ))}
        </HomepageSection>
      </div>
      <Navbar/>
    </Body>
  );
};

