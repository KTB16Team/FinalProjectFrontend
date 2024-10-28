import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {getPost} from "@/apis/post.ts";
import {postVote} from "@/apis/vote.ts";
import Header from "@/components/Header/Header.tsx";

interface PostData {
  title: string;
  username: string;
  content: string;
  votes_plaintiff: number;
  votes_defandant: number;
  likes: number;
  view_count: number;
  votes_count: number;
  comments_count: number;
  created_at: string;
}

// Mock API functions
const mock = {
  title: "게시글 제목",
  username: "닉네임",
  content: "게시글 내용입니다. 이곳에 게시글의 상세 내용이 표시됩니다.",
  votes_plaintiff: 5,
  votes_defandant: 5,
  likes: 5,
  view_count: 475,
  votes_count: 10,
  comments_count: 10,
  created_at: "2024-10-26 19:35:08",
  comments: [
    {
      comment_id: 1,
      content: "댓글 내용입니다.",
      likes: 2,
      created_at: "2024-10-26 20:00:08",
      child_comments: [
        {
          child_comments_id: 1,
          content: "대댓글 내용입니다.",
          likes: 1,
          created_at: "2024-10-26 20:05:08",
        },
      ],
    },
  ],
};


export default function PostDetail() {
  const {postId} = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [selectedVote, setSelectedVote] = useState<"A" | "B" | null>(null);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    getPost(parseInt(postId!))
      .then((response) => {
        // setPost(response.data.data);
        setPost(mock);
      })
      .catch((error) => {
        // Handle error (e.g., logging or displaying an alert)
      });
  }, [postId]);

  const handleVote = (side: "A" | "B") => {
    postVote(parseInt(postId!), side)
      .then(() => {
        setIsVoted(true);
        setSelectedVote(side);
        // Optionally, fetch updated post data to reflect new vote counts
        getPost(parseInt(postId!)).then((response) => setPost(response.data.data));
      })
      .catch((error) => {
        // Handle error
      });
  };

  if (!post) return <div>Loading...</div>;

  // Calculate vote percentages
  const totalVotes = post.votes_count;
  const plaintiffPercentage = ((post.votes_plaintiff / totalVotes) * 100).toFixed(1);
  const defendantPercentage = ((post.votes_defandant / totalVotes) * 100).toFixed(1);

  return (
    <div>
      <Header title={"게시판"}/>
      <div
        className="p-4 bg-white rounded-lg max-w-2xl mx-auto"
        style={{
          marginTop: "15vh",
          height: "85vh"
        }}
      >
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

        {/* Author, Date, and Views */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>작성자: {post.username}</span>
          <span>{post.created_at}</span>
          <span>조회 {post.view_count}</span>
        </div>

        {/* Content */}
        <div className="text-gray-800 mb-6">{post.content}</div>

        {/* AI Result Link */}
        <Link to="/ai-results" className="text-blue-500 underline mb-4 inline-block">
          AI 결과보기
        </Link>

        {/* Voting Section */}
        <div className="border-t border-b py-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">투표</span>
            <span className="text-sm text-gray-500">{totalVotes}명 참여중</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setSelectedVote("A")}
              className={`px-4 py-2 mr-2 rounded-full border ${
                selectedVote === "A" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              입장 A {isVoted && `(${plaintiffPercentage}% | ${post.votes_plaintiff})`}
            </button>
            <button
              onClick={() => setSelectedVote("B")}
              className={`px-4 py-2 mr-2 rounded-full border ${
                selectedVote === "B" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              입장 B {isVoted && `(${defendantPercentage}% | ${post.votes_defandant})`}
            </button>
            <button
              onClick={() => handleVote(selectedVote!)}
              disabled={!selectedVote}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              {isVoted ? "재투표하기" : "투표하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
