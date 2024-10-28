import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "@/apis/post.ts";
import Header from "@/components/Header/Header.tsx";
import {
  postComment,
  postChildComment,
} from "@/apis/comment.ts";
import { postVote } from "@/apis/vote.ts";
import { PostForm } from "@/types/postPreviewForm.ts";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import ChildComment from "@/components/Post/ChildComment.tsx";
import Comment from "@/components/Post/Comment.tsx";

// Mock data for testing
const mockPost = {
  title: "게시글 제목",
  username: "닉네임",
  content: "게시글 내용입니다. 이곳에 게시글의 상세 내용이 표시됩니다.",
  votes_plaintiff: 5,
  votes_defendant: 5,
  likes: 5,
  view_count: 475,
  votes_count: 10,
  comments_count: 10,
  created_at: "2024-10-26 19:35:08",
  comments: [
    {
      is_mine: true,
      comment_id: 1,
      username: "닉네임",
      content: "첫 번째 댓글 내용입니다.",
      likes: 2,
      created_at: "2024-10-26 20:00:08",
      child_comments: [
        {
          is_mine: false,
          child_comments_id: 1,
          username: "닉네임",
          content: "첫 번째 대댓글 내용입니다.",
          likes: 1,
          created_at: "2024-10-26 20:05:08",
        },
      ],
    },
    {
      is_mine: false,
      comment_id: 2,
      username: "닉네임",
      content: "두 번째 댓글 내용입니다.",
      likes: 3,
      created_at: "2024-10-26 21:00:08",
      child_comments: [],
    },
  ],
};

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostForm | null>(null);
  const [selectedVote, setSelectedVote] = useState<"A" | "B" | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  useEffect(() => {
    getPost(parseInt(postId!))
      .then((response) => {
        // 실제 데이터 대신 mock 데이터를 사용해 설정
        setPost(mockPost);
      })
      .catch((error) => {
        // 에러 핸들링
      });
  }, [postId]);

  const handleVote = (side: "A" | "B") => {
    postVote(parseInt(postId!), side)
      .then(() => {
        setIsVoted(true);
        setSelectedVote(side);
        getPost(parseInt(postId!)).then((response) => setPost(response.data.data));
      })
      .catch((error) => {
        // 에러 핸들링
      });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentData = { content: newComment };

    if (replyingTo) {
      postChildComment(parseInt(postId!), replyingTo, commentData)
        .then(() => {
          setNewComment("");
          setReplyingTo(null);
          getPost(parseInt(postId!)).then((response) => setPost(response.data.data));
        })
        .catch((error) => {
          // 에러 핸들링
        });
    } else {
      postComment(parseInt(postId!), commentData)
        .then(() => {
          setNewComment("");
          getPost(parseInt(postId!)).then((response) => setPost(response.data.data));
        })
        .catch((error) => {
          // 에러 핸들링
        });
    }
  };

  const refreshComments = () => {
    getPost(parseInt(postId!))
      .then((response) => setPost(response.data.data))
      .catch((error) => {
        // Error handling
      });
  };

  if (!post) return <div>Loading...</div>;

  const totalVotes = post.votes_count;
  const plaintiffPercentage = ((post.votes_plaintiff / totalVotes) * 100).toFixed(1);
  const defendantPercentage = ((post.votes_defendant / totalVotes) * 100).toFixed(1);

  return (
    <div>
      <Header title="게시판" leftButton={<GoBackButton url={"/categories"} />} />
      <div className="p-4 bg-white" style={{ marginTop: "15vh", height: "80vh", overflowY: "scroll" }}>

        {/* 본문 */}
        <div className="border-b">
          <h1 className="text-2xl text-left font-bold mb-2">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>작성자: {post.username}</span>
            <span>{post.created_at}</span>
            <span>조회 {post.view_count}</span>
          </div>

          <div className="bg-background text-gray-800 text-left mb-6 rounded-xl p-3">{post.content}</div>

          <Link to="/ai-results" className="underline mb-2">AI 결과보기</Link>

          <div className="bg-background rounded-2xl p-2 mb-6">
            <div className="flex justify-between">
              <div className="text-left mb-2">
                <span className="text-lg font-semibold">투표</span>
                <span className="text-sm text-gray-500">{totalVotes}명 참여중</span>
              </div>
              <button
                onClick={() => handleVote(selectedVote!)}
                disabled={!selectedVote}
                className="text-xs px-4 py-2 bg-mainColor text-white rounded-xl"
              >
                {isVoted ? "재투표하기" : "투표하기"}
              </button>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVote("A")}
                className={`w-full text-left py-2 rounded-xl bg-white mb-2 ${
                  selectedVote === "A" ? "border-blue-500" : "border-gray-300"
                }`}
              >
                입장 A {isVoted && `(${plaintiffPercentage}% | ${post.votes_plaintiff})`}
              </button>
              <button
                onClick={() => setSelectedVote("B")}
                className={`w-full text-left py-2 rounded-xl bg-white ${
                  selectedVote === "B" ? "border-blue-500" : "border-gray-300"
                }`}
              >
                입장 B {isVoted && `(${defendantPercentage}% | ${post.votes_defendant})`}
              </button>
            </div>
          </div>

          <div className="w-full text-right mb-2">
            <span className="mr-3">
              <LikeLogo className="inline-block" /> {post.likes}
            </span>
            <span>
              <CommentLogo className="inline-block" /> {post.comments_count}
            </span>
          </div>
        </div>

        {/* 댓글 */}
        <div>
          {post.comments.map((comment) => (
            <React.Fragment key={comment.comment_id}>
              <Comment comment={comment} onReply={setReplyingTo} refreshComments={refreshComments} />
              {comment.child_comments.map((child) => (
                <ChildComment key={child.child_comments_id} child={child} onReply={setReplyingTo} refreshComments={refreshComments} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 댓글 쓰기 */}
      <div
        className="flex p-1 absolute bottom-0 w-full bg-white"
        style={{
          height: "7vh",
        }}
      >
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="border rounded p-2 flex-grow"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded flex-shrink-0"
        >
          전송
        </button>
      </div>
    </div>
  );
}
