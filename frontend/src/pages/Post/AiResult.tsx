import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import {useParams} from "react-router-dom";
import PrevButton from "@/assets/imgs/PrevButton.svg?react";
import NextButton from "@/assets/imgs/NextButton.svg?react";
import JudgementSlide from "@/components/MyPrivatePost/JudgementSlide.tsx";
import {getAiResult} from "@/apis/post.ts";
import TitleIcon from "@/assets/imgs/TitleIcon.svg?react";
import {JudgementSlideForm} from "@/types/myPrivatePostForm.ts";
import {AiResultForm} from "@/types/postForm.ts";

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  currentSlide: number;
  slideCount?: number;
}

const SLIDE_COUNT = 4;

function PrevArrow({onClick, currentSlide}: ArrowProps) {
  if (currentSlide === 0) return null;
  return (
    <button onClick={onClick} className="z-10 absolute left-4 top-7 transform -translate-y-1/2 p-2">
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

export default function AiResultDetail() {
  const {postId} = useParams<{ postId: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postData, setPostData] = useState<AiResultForm | null>(null);
  const [judgementSlideForm, setJudgementSlideForm] = useState<JudgementSlideForm | null>(null);

  useEffect(() => {
    // postId가 유효할 때에만 getPrivatePost 호출
    if (postId) {
      getAiResult(parseInt(postId))
        .then((response) => {
          setPostData(response.data.data);

          const judgementSlideForm : JudgementSlideForm = {
            judgement: response.data.data.judgement,
            faultRateDefendant: response.data.data.faultRateDefendant,
            faultRatePlaintiff: response.data.data.faultRatePlaintiff
          }

          setJudgementSlideForm(judgementSlideForm);
        })
        .catch(() => {
          console.error("서버에서 오류가 발생했습니다.");
        });
    }
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
      <Header title="AI 판결문" leftButton={<GoBackButton/>}/>
      <div
        className="bg-background w-full p-3"
        style={{
          height: "80vh", // 메인 스크롤 영역의 높이 조정
          overflowY: "scroll",
          marginTop: "15vh",
        }}

      >
        <div
          className="bg-white mb-2 p-4 flex items-center justify-center font-semibold text-lg"
          style={{
            height: "7vh",
          }}
        >
          <TitleIcon className="mr-2"/>
          {postData?.title}
        </div>

        <Slider {...settings}>
          {/* AI 요약문 슬라이드 */}
          <div>
            {/* AI 요약문 제목 박스 */}
            <div
              className="bg-white mb-2 p-4 flex items-center justify-center font-semibold text-lg rounded"
              style={{
                height: "7vh",
              }}
            >
              AI 요약문
              <NextArrow
                onClick={() => setCurrentSlide(currentSlide + 1)}
                currentSlide={currentSlide}
                slideCount={SLIDE_COUNT}
              />
            </div>

            {/* summary_ai 내용 박스 - 완전히 분리된 새로운 박스 */}
            <div className="bg-white mb-4 p-4 flex items-center justify-center font-light text-m text-left rounded">
              <div className="p-4">
                {postData?.summary}
              </div>
            </div>
          </div>

          {/* A의 입장 */}
          <div>
            <div
              className="bg-white mb-2 p-4 flex items-center justify-center font-semibold text-lg rounded"
              style={{
                height: "7vh",
              }}
            >
              A의 입장
              <NextArrow
                onClick={() => setCurrentSlide(currentSlide + 1)}
                currentSlide={currentSlide}
                slideCount={SLIDE_COUNT}
              />
            </div>

            <div className="bg-white mb-4 p-4 flex items-center justify-center font-light text-m text-left rounded">
              <div className="p-4">
                {postData?.stancePlaintiff}
              </div>
            </div>
          </div>

          {/* B의 입장 */}
          <div>
            <div
              className="bg-white mb-2 p-4 flex items-center justify-center font-semibold text-lg rounded"
              style={{
                height: "7vh",
              }}
            >
              B의 입장
              <NextArrow
                onClick={() => setCurrentSlide(currentSlide + 1)}
                currentSlide={currentSlide}
                slideCount={SLIDE_COUNT}
              />
            </div>

            <div className="bg-white mb-4 p-4 flex items-center justify-center font-light text-m text-left rounded">
              <div className="p-4">
                {postData?.stanceDefendant}
              </div>
            </div>
          </div>

          {/* 판결 */}
          <div>
            <div className="bg-white mb-2 p-4 flex items-center justify-center font-light text-m text-left rounded"
                 style={{
                   height: "7vh",
                 }}
            >
              판결
            </div>
            <div className="bg-white mb-4 p-4 flex items-center justify-center font-light text-m text-left rounded">
              <div className="p-4">
                {judgementSlideForm && (
                  <JudgementSlide judgementSlideForm={judgementSlideForm}/>
                )}
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}