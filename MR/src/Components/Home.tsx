import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPostHandler } from "../modules/action-creator/PostIndex";
import { RootState } from "../modules/Store";
import Loader from "react-loader-spinner";
import "../styles/home.scss";

interface IPost {
  id: number;
  postImage: string;
  postName: string;
  content: string;
}

function Home() {
  const isLogin = useSelector((state: RootState) => state.User.userLoading);
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPostHandler(setLoading));
  }, [isLogin]);

  const MainData = useSelector((state: RootState) => state.Post.TotalData);

  const pop = MainData?.popularPostResponseList?.slice(0, 3);

  //인기 글 가져오기
  const popularList: IPost = pop?.map((item: any) => {
    return (
      <div className="feed" key={item.id}>
        <img src={item.postImage} />
        <h4>{item.postName}</h4>
        <h6 style={{ textOverflow: "ellipsis" }} dangerouslySetInnerHTML={{ __html: item.content }}></h6>
      </div>
    );
  });

  //내 피드 리스트 가져오기
  const MyFeedList: IPost = MainData?.recentMyPostResponseList?.map((item: any) => {
    return (
      <div className="feed" key={item.id}>
        <img src={item.postImage} width="500px" />
        <h4>{item.postName}</h4>
        <h6 style={{ textOverflow: "ellipsis" }}>{item.content}</h6>
      </div>
    );
  });

  const MyRecentList: IPost = MainData?.recentEveryPostResponseList?.map((item: any) => {
    return (
      <div className="post_container" key={item.id}>
        <img src={item.postImage} alt="" width="92px" height="92px" />
        <div className="content_container">
          <h2>{item.postName}</h2>
          <h6 style={{ textOverflow: "ellipsis" }}>{item.content}</h6>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      {Loading ? (
        <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} />
      ) : (
        <div className="home">
          {isLogin ? (
            <>
              <div className="myfeed_container">
                <h2>My 피드</h2>
                <div className="feed_container">{MyFeedList}</div>
              </div>
              <div className="populer_feed">
                <h2>인기글</h2>
                <div className="feed_container">{popularList}</div>
              </div>
            </>
          ) : (
            <div className="populer_feed">
              <h2>인기글</h2>
              <div className="feed_container">{popularList}</div>
            </div>
          )}
          <div className="new_post">
            <h2>최신 자료</h2>
            {MyRecentList}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
