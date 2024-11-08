import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getPost, postPostLike, postPostView} from "@/apis/post.ts";
import Header from "@/components/Header/Header.tsx";
import {postChildComment, postComment} from "@/apis/comment.ts";
import {postVote} from "@/apis/vote.ts";
import {PostForm} from "@/types/postForm.ts";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import ChildComment from "@/components/Post/ChildComment.tsx";
import Comment from "@/components/Post/Comment.tsx";
import VoteIcon from "@/assets/imgs/Vote.svg?react";
import {PostCommentForm} from "@/types/commentForm.ts";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";
import Body from "@/components/Body/Body.tsx";
import LoadingWithBackgroundGray from "@/components/Loading/LoadingWithBackgroundGray.tsx";
import VoteButton from "@/components/Vote/VoteButton.tsx";

export default function PostDetail() {
  const {postId} = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostForm | null>(null);
  const [likeType, setLikeType] = useState<string>("LIKE");
  const [selectedVote, setSelectedVote] = useState<"PLAINTIFF" | "DEFENDANT" | "NONE">("NONE");
  const [isVoted, setIsVoted] = useState(false);
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [plaintiffPercentage, setPlaintiffPercentage] = useState<string>("0.0");
  const [defendantPercentage, setDefendantPercentage] = useState<string>("0.0");
  const navigate = useNavigate();
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 정보 가져오기
  const fetchPost = () => {
    setIsLoading(true);

    postPostView(parseInt(postId!));

    getPost(parseInt(postId!))
      .then((response) => {
        const postData = response.data.data;
        setPost(postData);

        // 투표 여부 확인
        setSelectedVote(postData.side);
        setIsVoted(postData.side !== "NONE");

        // 비율 계산 후 상태 업데이트
        if (postData.votesCount > 0) {
          setPlaintiffPercentage(((postData.votesPlaintiff / postData.votesCount) * 100).toFixed(1));
          setDefendantPercentage(((postData.votesDefendant / postData.votesCount) * 100).toFixed(1));
        }
      })
      .catch((error) => {
        const data = error.response.data;
        if (data.code === "POST-001") {
          console.log("해당 게시글을 찾을 수 없습니다.");
          navigate(-1);
        } else {
          navigate("/500");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 투표하기
  const handleVote = () => {
    postVote(parseInt(postId!), selectedVote)
      .then(() => {
        setIsVoted(true);
        setIsVotingEnabled(false);
        fetchPost();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        navigate("/500");
      });
  };

  // 투표 활성화
  const enableVoting = () => {
    setIsVotingEnabled(true);
    setSelectedVote("PLAINTIFF"); // 기본 포커스 A로 설정
  };

  // 투표 초기화
  const resetVote = () => {
    setSelectedVote("PLAINTIFF");
    setIsVoted(false);
    setIsVotingEnabled(true);
  };

  // 투표 선택
  const handleVoteSelection = (side: "PLAINTIFF" | "DEFENDANT") => {
    if (isVotingEnabled) {
      setSelectedVote(side);
    }
  };

  // 댓글 달기
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const request: PostCommentForm = {content: newComment};

    if (replyingTo) {
      postChildComment(parseInt(postId!), replyingTo, request)
        .then(() => {
          setNewComment("");
          setReplyingTo(null);
          fetchPost();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          navigate("/500");
        });
    } else {
      postComment(parseInt(postId!), request)
        .then(() => {
          setNewComment("");
          fetchPost();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          navigate("/500");
        });
    }
  };

  // 좋아요
  const handleLike = () => {
    postPostLike(parseInt(postId!), likeType)
      .then(() => {
        setLikeType(likeType === "LIKE" ? "CANCEL_LIKE" : "LIKE");
        fetchPost();
      })
      .catch(() => {
        alert("서버 오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (!post) return <LoadingWithBackgroundGray/>;

  return (
    <div>
      <Header title="게시판" leftButton={<GoBackButton/>}/>
      <Body style={{paddingBottom: "15vh"}}>
        <div className="border-b">
          {/*메타정보*/}
          <h1 className="text-2xl text-left font-bold mb-2">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>작성자: {post.nickname}</span>
            <div className="flex space-x-2">
              <span>{post.createdAt}</span>
              <span>조회 {post.viewsCount}</span>
            </div>
          </div>

          {/* 본문 */}
          <div className="bg-background text-gray-800 text-left mb-6 rounded-xl p-3">
            {post.content}

            {/* AI 결과보기 */}
            <Link to={`/posts/${postId}/judgement`} className="text-right block no-underline text-sm font-bold"
                  style={{textDecoration: "underline", textDecorationStyle: "dotted"}}>
              AI 결과보기
            </Link>
          </div>

          {/* 투표 섹션 */}
          <div className="bg-background rounded-2xl p-4 mb-6">

            {/*메타 정보*/}
            <div className="flex justify-between mb-4">
              <div className="text-left">
                <VoteIcon className="inline-block mr-1"/>
                <span className="text-lg font-semibold mr-2">투표</span>
                <span className="text-lg font-semibold mr-2">|</span>
                <span className="text-sm font-semibold">{post.votesCount}명 참여중...</span>
              </div>
              {isVoted ? (
                <button onClick={resetVote} className="text-xs px-4 py-2 bg-mainColor text-white rounded-lg">
                  재투표하기
                </button>
              ) : (
                !isVotingEnabled && (
                  <button onClick={enableVoting} className="text-xs px-4 py-2 bg-mainColor text-white rounded-lg">
                    투표하기
                  </button>
                )
              )}
            </div>

            {/*투표 현황 및 입장 선택*/}
            <div>
              <VoteButton
                label="입장 A"
                selected={selectedVote === "PLAINTIFF"}
                isVotingEnabled={isVotingEnabled}
                onClick={() => handleVoteSelection("PLAINTIFF")}
                percentage={plaintiffPercentage}
                votes={post.votesPlaintiff}
              />

              <VoteButton
                label="입장 B"
                selected={selectedVote === "DEFENDANT"}
                isVotingEnabled={isVotingEnabled}
                onClick={() => handleVoteSelection("DEFENDANT")}
                percentage={defendantPercentage}
                votes={post.votesDefendant}
              />
            </div>

            {isVotingEnabled && (
              <div className="w-full flex justify-end">
                <button onClick={handleVote} className="text-xs px-4 py-2 bg-mainColor text-white rounded-lg">
                  확인
                </button>
              </div>

            )}
          </div>

          {/*포스트 좋아요, 댓글수*/}
          <div className="w-full text-right mb-2">
            <span className="mr-3">
              <button onClick={() => setShowLikeModal(true)}>
                <LikeLogo className="inline-block"/> {post.likesCount}
              </button>
            </span>
            <span>
              <CommentLogo className="inline-block"/> {post.commentsCount}
            </span>
          </div>
        </div>

        {/*댓글*/}
        <div>
          {post.comments.map((comment, index) => (
            <React.Fragment key={index}>
              <Comment comment={comment} onReply={setReplyingTo} refreshComments={fetchPost}/>
              {comment.childComments.map((child) => (
                <ChildComment key={child.childCommentId} child={child} onReply={setReplyingTo}
                              refreshComments={fetchPost}/>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Body>

      {/*댓글 달기*/}
      <div className="flex p-1 absolute bottom-0 w-full bg-white" style={{height: "7vh"}}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 남겨주세요."
          className="border rounded p-2 flex-grow"
        />
        <button onClick={handleAddComment} className="px-4 py-2 bg-blue-500 text-white rounded flex-shrink-0">
          입력
        </button>
      </div>

      {/*좋아요 모달*/}
      {showLikeModal && (
        <ConfirmModal
          message="좋아요를 누르시겠습니까?"
          onConfirm={() => {
            handleLike();
            setShowLikeModal(false);
          }}
          onCancel={() => setShowLikeModal(false)}
        />
      )}

      {isLoading && <LoadingWithBackgroundGray/>}
    </div>
  );
}
