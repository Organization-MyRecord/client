import { url } from "inspector";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { GetFieldPostHandler } from "../modules/action-creator/PostIndex";
import { RootState } from "../modules/Store";
import "../styles/post-list.scss";

interface Iprams {
  Field: string;
}

function PostList({ match }: RouteComponentProps<Iprams>) {
  const { Field } = match.params;
  const field: string = Field.replace(/-/gi, "/");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFieldPostHandler(field));
  }, [Field]);

  const data = useSelector((state: RootState) => state.Post.FieldData);
  const date = data?.myPostList?.postDate;

  const fieldPost = data?.myPostList?.map((item: any, index: any) => {
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
            <p className="post_text">{item.content}</p>
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