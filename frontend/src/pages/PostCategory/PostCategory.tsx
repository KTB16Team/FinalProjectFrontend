import PostCategoryItem from "@/components/PostCategory/PostCategoryItem.tsx";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";

const BellButton = () => (
  <button className="p-2 relative">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  </button>
);

export default function PostCategory() {
  return (
    <div>
      <Header title={"메뉴"} leftButton={<GoBackButton url="/"/>} rightButton={<BellButton />}/>
      <div
        className="bg-background w-full p-3"
        style={{
          marginTop: "15vh",
          height: "85vh"
        }}
      >
        {/*나와 관련된 글*/}
        <div className="mb-6 mt-6">
          <PostCategoryItem
            name={"내 개인글"}
            path={"/my-private-posts"}
          />
          <PostCategoryItem
            name={"내 공개글"}
            path={"/categories/my-public-posts"}
          />
          <PostCategoryItem
            name={"댓글 단 글"}
            path={"/categories/commented-posts"}
          />
        </div>

        {/*게시판*/}
        <div className="mb-6">
          <PostCategoryItem
            name={"인기 게시판"}
            path={"/categories/popular-posts"}
          />
          <PostCategoryItem
            name={"전체 게시판"}
            path={"/categories/all-posts"}
          />
        </div>

        {/*마이 페이지*/}
        <div>
          <PostCategoryItem
            name={"마이 페이지"}
            path={"/my-page"}
          />
        </div>
      </div>
    </div>
  );
}