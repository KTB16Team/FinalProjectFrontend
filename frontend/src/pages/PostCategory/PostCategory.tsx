import PostCategoryItem from "@/components/PostCategory/PostCategoryItem.tsx";
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import BellButton from "@/components/Button/BellButton.tsx";

export default function PostCategory() {

  return (
    <div>
      <Header title={"메뉴"} leftButton={<GoBackButton/>} rightButton={<BellButton/>}/>
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