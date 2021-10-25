import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPostHandler } from "../modules/action-creator/PostIndex";
import { RootState } from "../modules/Store";
import Loader from "react-loader-spinner";
import DOMPurify from "dompurify";
import "../styles/home.scss";
import { IsLoginHandler, SideBarOpenHandler } from "../modules/action-creator";
import { Link } from "react-router-dom";

interface IPost {
  id: number;
  postImage: string;
  postName: string;
  content: string;
}

//텍스트에서 이미지 및 줄바꿈 삭제
function DeleteTag(content: string) {
  const brTag = /<BR(.*?)>/gi;
  const imageTag = /<IMG(.*?)>/gi;
  const text = content.replace(brTag, "");

  return text.replace(imageTag, "");
}

function Home() {
  const isLogin = useSelector((state: RootState) => state.User.isLogin);
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SideBarOpenHandler());
    if (!sessionStorage.getItem("token")) {
      dispatch(IsLoginHandler());
    }
    dispatch(GetPostHandler(setLoading, dispatch));
  }, [isLogin, dispatch]);

  const MainData = useSelector((state: RootState) => state.Post.TotalData);

  const pop = MainData?.popularPostResponseList?.slice(0, 4);
  const pop2 = MainData?.popularPostResponseList?.slice(4, 8);

  //인기 글 가져오기
  const popular: IPost = pop?.map((item: any) => {
    return (
      <Link to={`/post/${item.postUserEmail}/${item.id}`} className="card" key={item.id}>
        <div
          className="thumb"
          style={{
            backgroundImage:
              item.postImage === null || item.postImage == "string"
                ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                : `url(${item.postImage})`,
          }}
        />
        <article>
          <h1>{item.postName}</h1>
          <h6
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(DeleteTag(item.content)),
            }}
          />
          <span></span>
        </article>
      </Link>
    );
  });

  const popular2: IPost = pop2?.map((item: any) => {
    return (
      <Link to={`/post/${item.postUserEmail}/${item.id}`} className="card" key={item.id}>
        <div
          className="thumb"
          style={{
            backgroundImage:
              item.postImage === null || item.postImage == "string"
                ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                : `url(${item.postImage})`,
          }}
        />
        <article>
          <h1>{item.postName}</h1>
          <h6
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(DeleteTag(item.content)),
            }}
          />
          <span></span>
        </article>
      </Link>
    );
  });

  //내 피드 리스트 가져오기
  const MyFeedList: IPost = MainData?.recentMyPostResponseList?.map((item: any) => {
    return (
      <Link to={`/post/${item.postUserEmail}/${item.id}`} className="card" key={item.id}>
        <div
          className="thumb"
          style={{
            backgroundImage:
              item.postImage === null || item.postImage == "string"
                ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                : `url(${item.postImage})`,
          }}
        />
        <article>
          <h1>{item.postName}</h1>
          <h6
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(DeleteTag(item.content)),
            }}
          />
          <span></span>
        </article>
      </Link>
    );
  });

  const MyRecentList: IPost = MainData?.recentEveryPostResponseList?.map((item: any) => {
    return (
      <li className="list_item" key={item.id}>
        <div className="content">
          <Link to={`/post/${item.postUserEmail}/${item.id}`}>
            <div
              className="post_image"
              style={{
                backgroundImage:
                  item.postImage === null || item.postImage == "string"
                    ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                    : `url(${item.postImage})`,
              }}
            ></div>
          </Link>
          <div className="box_content">
            <Link className="link_title" to={`/post/${item.postUserEmail}/${item.id}`}>
              <strong className="post_title">{item.postName}</strong>
            </Link>
            <div className="post_info">
              <Link to="" className="userName">
                <span className="nametag">{item.postUserEmail}</span>
              </Link>
              <span className="date">2021.09.08</span>
            </div>
          </div>
        </div>
      </li>
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
                <div className="card_container">{MyFeedList}</div>
              </div>
              <div className="myfeed_container">
                <h2>인기글</h2>
                <div className="card_container">{popular}</div>
              </div>
            </>
          ) : (
            <div className="myfeed_container">
              <h2>인기글</h2>
              <div className="card_container" style={{ marginBottom: "20px" }}>
                {popular}
              </div>
              <div className="card_container">{popular2}</div>
            </div>
          )}
          <div className="new_post">
            <h2>최신 자료</h2>
            <ul className="list">{MyRecentList}</ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
