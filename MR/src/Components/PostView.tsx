import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { GetPostingHandler } from "../modules/action-creator/PostIndex";
import { RootState } from "../modules/Store";
import "../styles/post-view.scss";

interface MatchParams {
  postId: string;
  userName: string;
}

function PostView({ match }: RouteComponentProps<MatchParams>) {
  console.log(match);

  const dispatch = useDispatch();
  const { postId, userName } = match.params;
  const history = useHistory();
  useEffect(() => {
    dispatch(GetPostingHandler(postId));
  }, [postId, userName]);

  const postData = useSelector((state: RootState) => state.Post.PostData);

  return (
    <div className="view_wrapper">
      <button style={{ float: "right" }} onClick={() => history.goBack()}>
        목록
      </button>
      <div className="view_content">
        <div className="content_info">
          <h2>{postData?.postName}</h2>
          <div className="post_info">
            <Link className="nametag" to="">
              {postData?.postUserEmail}
            </Link>
            <span className="post_date">{postData?.date}</span>
          </div>
        </div>
        <div className="view" dangerouslySetInnerHTML={{ __html: postData?.content }}></div>
      </div>
    </div>
  );
}

export default PostView;
