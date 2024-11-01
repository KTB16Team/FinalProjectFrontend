import React, {useState, useEffect, useContext} from "react";
import Slider from "react-slick";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import {useNavigate, useParams} from "react-router-dom";
import PrevButton from "@/assets/imgs/PrevButton.svg?react";
import NextButton from "@/assets/imgs/NextButton.svg?react";
import TextSlide from "@/components/MyPrivatePost/TextSlide.tsx";
import JudgementSlide from "@/components/MyPrivatePost/JudgementSlide.tsx";
import {getPrivatePost} from "@/apis/post.ts";
import {AuthContext} from "@/contexts/AuthContext.tsx";

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  currentSlide: number;
  slideCount?: number;
}

interface PostData {
  title: string;
  summary_ai: string;
  stance_plaintiff: string;
  stance_diefendant: string;
  judgement: string;
  fault_rate: number;
}

const SLIDE_COUNT = 4;

function PrevArrow({onClick, currentSlide}: ArrowProps) {
  if (currentSlide === 0) return null;
  return (
    <button onClick={onClick} className="z-10 absolute left-4 top-7 p-2">
      <PrevButton/>
    </button>
  );
}

function NextArrow({onClick, currentSlide, slideCount}: ArrowProps) {
  if (slideCount && currentSlide === slideCount - 1) return null;
  return (
    <button onClick={onClick} className="z-10 absolute right-4 top-7 transform -translate-y-1/2 p-2">
      <NextButton/>
    </button>
  );
}

export default function MyPrivatePostDetail() {
  const {postId} = useParams<{ postId: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postData, setPostData] = useState<PostData | null>(null);
  const navigate = useNavigate();
  const {refreshAccessToken, logout} = useContext(AuthContext)!;

  const dummyData = {
    title: "교통사고 대화록",
    summary_ai: "이 사건은 피고인의 잘못된 차선 변경으로 인한 교통사고로, 피해자와 피고인의 과실을 검토한 결과입니다.",
    stance_plaintiff: "원고는 정상적인 차선에서 주행 중이었으며, 피고인의 무리한 차선 변경으로 인해 사고가 발생했다고 주장하고 있습니다.",
    stance_diefendant: "피고인은 사고 당시 주변 차량이 많아 어쩔 수 없이 차선을 변경해야 했으며, 원고가 속도를 줄이지 않아 사고가 발생했다고 주장합니다.",
    judgement: "AI는 피고인의 차선 변경이 부적절했다고 판단하여, 과실 비율을 원고 56.8%, 피고 43.2%로 결정하였습니다.",
    fault_rate: 100,
  };

  useEffect(() => {
    getPrivatePost(Number(postId))
      .then((response) => {
        setPostData(dummyData);
      })
      .catch((error) => {
        if (error.response.data.code === "AUTH_001") {
          navigate('/login');
        } else if (error.response.data.code === "AUTH_003") {
          const newAccessToken = refreshAccessToken();
          if (newAccessToken != null) {
            getPrivatePost(Number(postId));
          } else {
            logout();
          }
        } else if (error.response.data.code === "PRIVATE-POST-001") {
          alert("해당 게시글이 존재하지 않습니다.");
          navigate('/my-private-posts');
        } else {
          console.error("서버에서 오류가 발생했습니다.");
        }
      });
  }, [postId]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (current: number) => setCurrentSlide(current),
    prevArrow: <PrevArrow currentSlide={currentSlide}/>,
    nextArrow: <NextArrow currentSlide={currentSlide} slideCount={SLIDE_COUNT}/>,
  };

  return (
    <div>
      <Header title="결과" leftButton={<GoBackButton url="/my-private-posts"/>}/>
      <div className="bg-background w-full p-3"
           style={{
             height: "85vh",
             overflowY: "scroll",
             marginTop: "15vh"
           }}>
        <div className="bg-white mb-2"
          style={{
            height: "7vh",
          }}
        >
          {postData?.title}
        </div>
        <Slider className="bg-white" {...settings}>
          <TextSlide title="AI 요약문" text={postData?.summary_ai}/>
          <TextSlide title="A 입장" text={postData?.stance_plaintiff}/>
          <TextSlide title="B 입장" text={postData?.stance_diefendant}/>
          <JudgementSlide title="판결" judgement={postData?.judgement} faultRate={postData?.fault_rate}/>
        </Slider>
      </div>
    </div>
  );
}
