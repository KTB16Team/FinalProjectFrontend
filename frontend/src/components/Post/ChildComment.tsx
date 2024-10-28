import { useState } from "react";
import LVectorLogo from "@/assets/imgs/LVector.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import MenuVertical from "@/assets/imgs/MenuVertical.svg?react";
import { postChildCommentLike, deleteChildComment } from "@/apis/comment.ts";
import { ChildCommentForm } from "@/types/CommentForm.ts";

interface ChildCommentProps {
  child: ChildCommentForm;
  onReply: (commentId: number) => void;
  refreshComments: () => void;
}

export default function ChildComment({ child, onReply, refreshComments }: ChildCommentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDelete = () => {
    deleteChildComment(child.child_comments_id)
      .then(refreshComments)
      .catch((error) => {
        // Error handling
      });
    setDropdownOpen(false);
  };

  return (
    <div className="border-b p-3 flex flex-row items-center">
      <LVectorLogo />
      <div className="w-full pl-2">
        <div className="flex flex-row justify-between">
          <div className="text-left font-bold">{child.username}</div>
          <div className="flex space-x-2">
            <button onClick={() => postChildCommentLike(child.child_comments_id)}>
              <LikeLogo />
            </button>
            <span>|</span>
            <button onClick={() => onReply(child.child_comments_id)}>
              <CommentLogo />
            </button>
            {child.is_mine && (
              <span>
                |
                <button onClick={toggleDropdown}>
                  <MenuVertical />
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white border rounded shadow-lg p-2">
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500"
                    >
                      대댓글 삭제
                    </button>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="text-left">{child.content}</div>
      </div>
    </div>
  );
}
