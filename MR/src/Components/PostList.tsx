import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { GetFieldPostHandler, GetSearchHandler } from "../modules/action-creator/PostIndex";
import DOMPurify from "dompurify";
import { RootState } from "../modules/Store";
import "../styles/post-list.scss";

interface Iprams {
  Field: string;
  KeyWord: string;
}

function PostList({ match }: RouteComponentProps<Iprams>) {
  const { Field, KeyWord } = match.params;
  const field: string = Field.replace(/-/gi, "/");
  const [page, setpage] = useState(0);
  const dispatch = useDispatch();

  console.log(setpage);

  useEffect(() => {
    if (Field === "-") {
      dispatch(GetSearchHandler(KeyWord, page, dispatch));
      console.log("어디로가니~~");
    } else {
      dispatch(GetFieldPostHandler(field, dispatch));
      console.log("여기로 갔니~~");
    }
  }, [Field, KeyWord]);

  const data = useSelector((state: RootState) => state.Post.FieldData);
  const date = data?.myPostList?.postDate;

  const fieldPost = data?.myPostList?.map((item: any) => {
    return (
      <li className="list_item" key={item.id}>
        <div className="content">
          <Link to={`/post/${item.postUserEmail}/${item.id}`}>
            <div className="post_image" style={{ backgroundImage: `url(${item.postImage})` }}></div>
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
                __html: DOMPurify.sanitize(item.content),
              }}
            ></p>
            <button className="readMore">더보기..</button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="List_Container">
      <div className="category_list">
        <ul className="list">{fieldPost}</ul>
      </div>
    </div>
  );
}

export default PostList;
