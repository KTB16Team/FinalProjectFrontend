import { useState, useEffect, useRef } from "react";
import LVectorLogo from "@/assets/imgs/LVector.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import MenuVertical from "@/assets/imgs/MenuVertical.svg?react";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx"; // ConfirmModal 추가
import { postChildCommentLike, deleteChildComment } from "@/apis/comment.ts";
import { ChildCommentForm } from "@/types/commentForm.ts";

interface ChildCommentProps {
  child: ChildCommentForm;
  refreshComments: () => void;
}

export default function ChildComment({ child, refreshComments }: ChildCommentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likeType, setLikeType] = useState<string>("LIKE");
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // 대댓글 삭제
  const handleDelete = () => {
    deleteChildComment(child.childCommentId)
      .then(refreshComments)
      .catch((error) => {
        const data = error.response.data;
        if (data.code === "CHILD-COMMENT-001") {
          alert("해당 댓글을 찾을 수 없습니다.");
        } else {
          alert("서버 오류가 발생했습니다.");
        }
      });
    setDropdownOpen(false);
  };

  {/* 좋아요 누르기 */}
  const handleLike = () => {
    postChildCommentLike(child.childCommentId, likeType)
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
    <div className="border-b p-3 flex flex-row items-center relative">
      <LVectorLogo />
      <div className="w-full pl-2">
        <div className="flex flex-row justify-between">
          <div className="text-left font-bold">{child.nickname}</div>
          <div className="flex space-x-2 items-center">

            {/* 좋아요 */}
            <button onClick={() => setShowLikeModal(true)}>
              <LikeLogo/>
            </button>

            {/*댓글 삭제*/}
            {child.isMine && (
              <span className="flex" ref={dropdownRef}>
                |
                <button onClick={toggleDropdown} className="ml-1">
                  <MenuVertical style={{ verticalAlign: "middle" }} />
                </button>
                {dropdownOpen && (
                  <div className="bottom-full absolute right-0 bg-white border rounded shadow-lg p-2 flex z-50">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-red-500"
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
        <div className="text-left text-xs text-gray-500">
          {child.createdAt}
          <span className="ml-3">
          <LikeLogo className="inline-block"/> {child.likesCount}
        </span>
        </div>
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

      {/* 대댓글 삭제 확인 팝업 */}
      {showDeleteModal && (
        <ConfirmModal
          message="대댓글을 삭제하시겠습니까?"
          onConfirm={() => {
            handleDelete();
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
