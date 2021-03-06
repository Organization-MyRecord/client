import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { GetDirectoryData } from "../modules/action-creator/PostIndex";
import Loader from "react-loader-spinner";
import DOMPurify from "dompurify";
import { RootState } from "../modules/Store";
import "../styles/post-list.scss";
import { DeleteTag } from "./Home";

interface Iprams {
  directoryName: string;
  email: string;
}

function PostListTwo({ match }: RouteComponentProps<Iprams>) {
  const { directoryName, email } = match.params;
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    dispatch(GetDirectoryData(directoryName, email, setloading, dispatch));
  }, [directoryName, email, dispatch]);

  const data = useSelector((state: RootState) => state.Post.FieldData);
  const date = data?.myPostList?.postDate;

  const fieldPost = data?.postResponseList?.map((item: any) => {
    return (
      <li className="list_item" key={item.id}>
        <div className="content">
          <Link to={`/post/${item.postUserEmail}/${item.id}`}>
            <div
              className="post_image"
              style={{
                backgroundImage:
                  item.postImage === null || item.postImage === "string"
                    ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                    : `url(${item.postImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>
          </Link>
          <div className="box_content">
            <Link to={`/post/${item.postUserEmail}/${item.id}`}>
              <div className="link_title">{item.postName}</div>
            </Link>
            <div className="post_info">
              <Link to="/mypage" className="userName">
                <span className="nametag">{item.postUserEmail}</span>
              </Link>
              <span className="date">{date}</span>
            </div>
            <p
              className="post_text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(DeleteTag(item.content)),
              }}
            ></p>
            <button className="readMore">?????????..</button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="List_Container">
      {loading ? (
        <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} />
      ) : (
        <div className="category_list">
          <ul className="list">
            {fieldPost.length === 0 ? <li className="none_posting">???????????? ?????? ????????????.</li> : fieldPost}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostListTwo;
