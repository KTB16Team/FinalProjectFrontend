import { useState, useEffect, useRef } from "react";
import { deleteComment, postCommentLike } from "@/apis/comment.ts";
import { CommentForm } from "@/types/CommentForm.ts";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import MenuVertical from "@/assets/imgs/MenuVertical.svg?react";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";

interface CommentProps {
  comment: CommentForm;
  onReply: (commentId: number) => void;
  refreshComments: () => void;
}

export default function Comment({ comment, onReply, refreshComments }: CommentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likeType, setLikeType] = useState<string>("LIKE");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false); // 대댓글 작성 팝업 상태
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDelete = () => {
    deleteComment(comment.commentId)
      .then(refreshComments)
      .catch((error) => {
        const data = error.response.data;
        if (data.code === "COMMENT-001") {
          alert("해당 댓글을 찾을 수 없습니다.");
        } else {
          alert("서버 오류가 발생했습니다.");
        }
      });
    setDropdownOpen(false);
  };

  const handleLike = () => {
    postCommentLike(comment.commentId, likeType)
      .then(() => {
        setLikeType(likeType === "LIKE" ? "CANCEL_LIKE" : "LIKE");
        refreshComments();
      })
      .catch(() => {
        alert("서버 오류가 발생했습니다.");
      });
  };

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="border-b p-3">
      <div className="flex flex-row justify-between">
        <div className="text-left font-bold">{comment.nickname}</div>
        <div className="flex space-x-2 items-center">

          {/* 좋아요 */}
          <button onClick={() => setShowLikeModal(true)}>
            <LikeLogo />
          </button>
          <span>|</span>

          {/* 대댓글 작성 */}
          <button onClick={() => setShowReplyModal(true)}> {/* 대댓글 작성 팝업 표시 */}
            <CommentLogo />
          </button>

          {/* 댓글 삭제 */}
          {comment.isMine && (
            <span className="flex relative" ref={dropdownRef}>
              |
              <button onClick={toggleDropdown} className="ml-1">
                <MenuVertical style={{ verticalAlign: "middle" }} />
              </button>
              {dropdownOpen && (
                <div className="right-0 absolute bottom-full bg-white border rounded shadow-lg p-2 flex z-50">
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDropdownOpen(false); // 댓글 삭제 클릭 시 드롭다운 닫기
                    }}
                    className="px-4 py-2 text-sm text-red-500"
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
      <div className="text-left text-xs text-gray-500">
        {comment.createdAt}
        <span className="ml-3">
          <LikeLogo className="inline-block" /> {comment.likesCount}
        </span>
      </div>

      {/* 좋아요 확인 팝업 */}
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

      {/* 댓글 삭제 확인 팝업 */}
      {showDeleteModal && (
        <ConfirmModal
          message="댓글을 삭제하시겠습니까?"
          onConfirm={() => {
            handleDelete();
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* 대댓글 작성 확인 팝업 */}
      {showReplyModal && (
        <ConfirmModal
          message="대댓글을 작성하시겠습니까?"
          onConfirm={() => {
            onReply(comment.commentId); // 대댓글 작성 함수 호출
            setShowReplyModal(false);
          }}
          onCancel={() => setShowReplyModal(false)}
        />
      )}
    </div>
  );
}
