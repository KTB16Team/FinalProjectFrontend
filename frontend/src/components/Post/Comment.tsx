import { useState } from "react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import MenuVertical from "@/assets/imgs/MenuVertical.svg?react";
import { postCommentLike, deleteComment } from "@/apis/comment.ts";
import {CommentForm} from "@/types/CommentForm.ts";

interface CommentProps {
  comment: CommentForm;
  onReply: (commentId: number) => void;
  refreshComments: () => void;
}

export default function Comment({ comment, onReply, refreshComments }: CommentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDelete = () => {
    deleteComment(comment.comment_id)
      .then(refreshComments)
      .catch((error) => {
        // Error handling
      });
    setDropdownOpen(false);
  };

  return (
      <div className="border-b p-3">
        <div className="flex flex-row justify-between">
          <div className="text-left font-bold">{comment.username}</div>
          <div className="flex space-x-2 items-center">
            <button onClick={() => postCommentLike(comment.comment_id)}>
              <LikeLogo />
            </button>
            <span>|</span>
            <button onClick={() => onReply(comment.comment_id)}>
              <CommentLogo />
            </button>
            {comment.is_mine && (
                <span className="flex items-center">
            |
            <button onClick={toggleDropdown} className="ml-1">
              <MenuVertical style={{ verticalAlign: 'middle' }} />
            </button>
                  {dropdownOpen && (
                      <div className="absolute bg-white border rounded shadow-lg p-2">
                        <button
                            onClick={handleDelete}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500"
                        >
                          댓글 삭제
                        </button>
                      </div>
                  )}
          </span>
            )}
          </div>
        </div>
        <div className="text-left">{comment.content}</div>
      </div>
  );

}
