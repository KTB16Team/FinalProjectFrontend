import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import { useParams } from "react-router-dom";
import PrevButton from "@/assets/imgs/PrevButton.svg?react";
import NextButton from "@/assets/imgs/NextButton.svg?react";
import JudgementSlide from "@/components/MyPrivatePost/JudgementSlide.tsx";
import { getPrivatePost, postPost } from "@/apis/post.ts";
import BottomButton from "@/components/Button/BottomButton.tsx";
import TitleIcon from "@/assets/imgs/TitleIcon.svg?react";
import { JudgementSlideForm, MyPrivatePostForm } from "@/types/myPrivatePostForm.ts";
import { PostPostForm } from "@/types/postForm.ts";
import Body from "@/components/Body/Body.tsx";
import MyPrivatePostDetailTitle from "@/components/MyPrivatePostDetail/MyPrivatePostDetailTitle.tsx";
import MyPrivatePostDetailContent from "@/components/MyPrivatePostDetail/MyPrivatePostDetailContent.tsx";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";
import LoadingWithBackgroundGray from "@/components/Loading/LoadingWithBackgroundGray.tsx"; // 추가된 부분

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  currentSlide: number;
  slideCount?: number;
}

const SLIDE_COUNT = 4;

function PrevArrow({ onClick, currentSlide }: ArrowProps) {
  if (currentSlide === 0) return null;
  return (
    <button onClick={onClick} className="z-10 absolute left-4 top-7 transform -translate-y-1/2 p-2">
      <PrevButton />
    </button>
  );
}

function NextArrow({ onClick, currentSlide, slideCount }: ArrowProps) {
  if (slideCount && currentSlide === slideCount - 1) return null;
  return (
    <button onClick={onClick} className="z-10 absolute right-4 top-7 transform -translate-y-1/2 p-2">
      <NextButton />
    </button>
  );
}

export default function MyPrivatePostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postData, setPostData] = useState<MyPrivatePostForm | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [judgementSlideForm, setJudgementSlideForm] = useState<JudgementSlideForm | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  useEffect(() => {
    if (postId) {
      setIsLoading(true);

      getPrivatePost(parseInt(postId))
        .then((response) => {
          setPostData(response.data.data);
          setIsPublished(response.data.data.published);

          const judgementSlideForm: JudgementSlideForm = {
            judgement: response.data.data.judgement,
            faultRateDefendant: response.data.data.faultRateDefendant,
            faultRatePlaintiff: response.data.data.faultRatePlaintiff,
          };

          setJudgementSlideForm(judgementSlideForm);
        })
        .catch(() => {
          console.error("서버에서 오류가 발생했습니다.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [postId]);

  const handlePublish = () => {
    if (!postData) return;

    setIsLoading(true);
    const request: PostPostForm = {
      privatePostId: postData.privatePostId,
      title: postData.title,
      stancePlaintiff: postData.stancePlaintiff,
      stanceDefendant: postData.stanceDefendant,
      summaryAi: postData.summaryAi,
      judgement: postData.judgement,
      faultRatePlaintiff: postData.faultRatePlaintiff,
      faultRateDefendant: postData.faultRateDefendant,
      originType: "TEXT",
    };

    postPost(request)
      .then(() => {
        alert("대화록이 발행되었습니다.");
      })
      .catch((error) => {
        const response = error.response.data;

        if (response.code === "PRIVATEPOST-001") {
          alert("대화록을 찾을 수 없습니다.");
        } else if (response.code === "PRIVATEPOST-002") {
          alert("이미 발행된 대화록입니다.");
        } else {
          alert("서버에서 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (current: number) => setCurrentSlide(current),
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    nextArrow: <NextArrow currentSlide={currentSlide} slideCount={SLIDE_COUNT} />,
  };

  return (
    <div>
      <Header title="결과" leftButton={<GoBackButton />} />
      <Body className="bg-background pb-20">
        <MyPrivatePostDetailTitle>
          <TitleIcon className="mr-2" />
          {postData?.title}
        </MyPrivatePostDetailTitle>

        <Slider {...settings}>
          {/* AI 요약문 슬라이드 */}
          <div>
            <MyPrivatePostDetailTitle>AI 요약문</MyPrivatePostDetailTitle>
            <MyPrivatePostDetailContent>{postData?.summaryAi}</MyPrivatePostDetailContent>
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
              {judgementSlideForm && <JudgementSlide judgementSlideForm={judgementSlideForm} />}
            </MyPrivatePostDetailContent>
          </div>
        </Slider>

        {/*로딩 창*/}
        {isLoading && (<LoadingWithBackgroundGray/>)}
      </Body>

      {/* 발행 버튼 */}
      {!isPublished && (
        <BottomButton
          label="발행"
          disabled={isPublished}
          onClick={() => setShowModal(true)} // 모달 표시
          className="bg-red-400 text-white text-xl py-4 font-bold h-18"
        />
      )}

      {/*발행 모달*/}
      {showModal && (
        <ConfirmModal
          message="포스트를 발행하시겠습니까?"
          onConfirm={() => {
            setShowModal(false);
            handlePublish();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
