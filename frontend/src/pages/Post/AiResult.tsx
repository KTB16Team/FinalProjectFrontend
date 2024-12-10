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
import Body from "@/components/Body/Body.tsx";
import LoadingWithBackgroundGray from "@/components/Loading/LoadingWithBackgroundGray.tsx";
import MyPrivatePostDetailTitle from "@/components/MyPrivatePostDetail/MyPrivatePostDetailTitle.tsx";
import MyPrivatePostDetailContent from "@/components/MyPrivatePostDetail/MyPrivatePostDetailContent.tsx";
import {useModal} from "@/contexts/ModalContext.tsx";

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
  const [isLoading, setIsLoading] = useState(false);
  const { showModal } = useModal();


  useEffect(() => {
    // postId가 유효할 때에만 getPrivatePost 호출
    if (postId) {
      setIsLoading(true);
      getAiResult(parseInt(postId))
        .then((response) => {
          setPostData(response.data.data);

          const judgementSlideForm: JudgementSlideForm = {
            judgement: response.data.data.judgement,
            faultRateDefendant: response.data.data.faultRateDefendant,
            faultRatePlaintiff: response.data.data.faultRatePlaintiff
          }

          setJudgementSlideForm(judgementSlideForm);
        })
        .catch(() => {
          showModal("서버에서 오류가 발생했습니다.", () => {});
        }).finally(() => {
          setIsLoading(false);
        }
      )
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
      <Body
        className="bg-background"
      >
        <MyPrivatePostDetailTitle>
          <TitleIcon className="mr-2"/>
          {postData?.title}
        </MyPrivatePostDetailTitle>

        <Slider {...settings}>
          {/* AI 요약문 슬라이드 */}
          <div>
            <MyPrivatePostDetailTitle>AI 요약문</MyPrivatePostDetailTitle>
            <MyPrivatePostDetailContent>{postData?.summary}</MyPrivatePostDetailContent>
          </div>

          {/* A의 입장 */}
          <div>
            <MyPrivatePostDetailTitle>A의 입장</MyPrivatePostDetailTitle>
            <MyPrivatePostDetailContent>{postData?.stancePlaintiff}</MyPrivatePostDetailContent>
          </div>

          {/* B의 입장 */}
          <div>
            <MyPrivatePostDetailTitle>B의 입장</MyPrivatePostDetailTitle>
            <MyPrivatePostDetailContent>{postData?.stanceDefendant}</MyPrivatePostDetailContent>
          </div>

          {/* 판결 */}
          <div>
            <MyPrivatePostDetailTitle>판결</MyPrivatePostDetailTitle>
            <MyPrivatePostDetailContent>
              {judgementSlideForm && (
                <JudgementSlide judgementSlideForm={judgementSlideForm}/>
              )}
            </MyPrivatePostDetailContent>
          </div>
        </Slider>
        {/*로딩 창*/}
        {isLoading && (<LoadingWithBackgroundGray/>)}
      </Body>
    </div>
  );
}