import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, postPostLike } from "@/apis/post.ts";
import Header from "@/components/Header/Header.tsx";
import { postChildComment, postComment } from "@/apis/comment.ts";
import { postVote } from "@/apis/vote.ts";
import { PostForm } from "@/types/postPreviewForm.ts";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import ChildComment from "@/components/Post/ChildComment.tsx";
import Comment from "@/components/Post/Comment.tsx";
import VoteIcon from "@/assets/imgs/vote.svg?react";
import { PostCommentForm } from "@/types/CommentForm.ts";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostForm | null>(null);
  const [likeType, setLikeType] = useState<string>("LIKE");
  const [selectedVote, setSelectedVote] = useState<"PLAINTIFF" | "DEFENDANT" | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const navigate = useNavigate();
  const [showLikeModal, setShowLikeModal] = useState(false);

  const fetchPost = () => {
    getPost(parseInt(postId!))
      .then((response) => setPost(response.data.data))
      .catch((error) => {
        const data = error.response.data;
        if (data.code === "POST-001") {
          console.log("해당 게시글을 찾을 수 없습니다.");
          navigate(-1);
        } else {
          navigate("/500");
        }
      });
  };

  const handleVote = (side: "PLAINTIFF" | "DEFENDANT") => {
    postVote(parseInt(postId!), side)
      .then(() => {
        setIsVoted(true);
        setSelectedVote(side);
        fetchPost();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        navigate("/500");
      });
  };

  const resetVote = () => {
    setSelectedVote(null);
    setIsVoted(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const request: PostCommentForm = { content: newComment };

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

  if (!post) return <div>Loading...</div>;

  const totalVotes = post.votesCount;
  const plaintiffPercentage = ((post.votesPlaintiff / totalVotes) * 100).toFixed(1);
  const defendantPercentage = ((post.votesDefendant / totalVotes) * 100).toFixed(1);

  return (
    <div>
      <Header title="게시판" leftButton={<GoBackButton />} />
      <div className="p-4 bg-white" style={{ marginTop: "15vh", height: "80vh", overflowY: "scroll" }}>
        <div className="border-b">
          <h1 className="text-2xl text-left font-bold mb-2">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>작성자: {post.nickname}</span>
            <div className="flex space-x-2">
              <span>{post.createdAt}</span>
              <span>조회 {post.viewsCount}</span>
            </div>
          </div>

          <div className="bg-background text-gray-800 text-left mb-6 rounded-xl p-3">
            {post.content}
            <Link to="/ai-results" className="text-right block no-underline text-sm font-bold" style={{ textDecoration: "underline", textDecorationStyle: "dotted" }}>
              AI 결과보기
            </Link>
          </div>

          {/* 투표 섹션 */}
          <div className="bg-background rounded-2xl p-2 mb-6 mt-4">
            <div className="flex justify-between mb-4">
              <div className="text-left">
                <VoteIcon className="inline-block mr-1" />
                <span className="text-lg font-semibold mr-2">투표</span>
                <span className="text-lg font-semibold mr-2">|</span>
                <span className="text-sm font-semibold">{totalVotes}명 참여중...</span>
              </div>
              {isVoted && (
                <button onClick={resetVote} className="text-xs px-4 py-2 bg-mainColor text-white rounded-lg mr-4">
                  재투표하기
                </button>
              )}
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => !isVoted && handleVote("PLAINTIFF")}
                className={`w-11/12 text-left py-2 rounded-xl mb-2 text-sm ml-2 mr-2 relative p-2 bg-white`}
                style={{
                  background: `linear-gradient(to right, #E55958 ${plaintiffPercentage}%, #FFFFFF ${plaintiffPercentage}%)`,
                  color: selectedVote === "PLAINTIFF" || isVoted ? "black" : "black",
                }}
              >
                입장 A {isVoted && `(${plaintiffPercentage}% | ${post.votesPlaintiff})`}
              </button>
              <button
                onClick={() => !isVoted && handleVote("DEFENDANT")}
                className={`w-11/12 text-left py-2 rounded-xl mb-2 text-sm ml-2 mr-2 relative p-2 bg-white`}
                style={{
                  background: `linear-gradient(to right, #E55958 ${defendantPercentage}%, #FFFFFF ${defendantPercentage}%)`,
                  color: selectedVote === "DEFENDANT" || isVoted ? "black" : "black",
                }}
              >
                입장 B {isVoted && `(${defendantPercentage}% | ${post.votesDefendant})`}
              </button>
            </div>
          </div>

          <div className="w-full text-right mb-2">
            <span className="mr-3">
              <button onClick={() => setShowLikeModal(true)}>
                <LikeLogo className="inline-block" /> {post.likesCount}
              </button>
            </span>
            <span>
              <CommentLogo className="inline-block" /> {post.commentsCount}
            </span>
          </div>
        </div>

        <div>
          {post.comments.map((comment, index) => (
            <React.Fragment key={index}>
              <Comment comment={comment} onReply={setReplyingTo} refreshComments={fetchPost} />
              {comment.childComments.map((child) => (
                <ChildComment key={child.childCommentId} child={child} onReply={setReplyingTo} refreshComments={fetchPost} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex p-1 absolute bottom-0 w-full bg-white" style={{ height: "7vh" }}>
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
    </div>
  );
}
