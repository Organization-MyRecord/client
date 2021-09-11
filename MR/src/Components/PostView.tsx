import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { GetPostingHandler } from "../modules/action-creator/PostIndex";
import { RootState } from "../modules/Store";
import "../styles/post-view.scss";

interface MatchParams {
  postId: string;
  userEmail: string;
}

function PostView({ match }: RouteComponentProps<MatchParams>) {
  console.log(match);

  const dispatch = useDispatch();
  const { postId, userEmail } = match.params;
  const history = useHistory();
  useEffect(() => {
    dispatch(GetPostingHandler(postId));
  }, [postId, userEmail]);

  const postData = useSelector((state: RootState) => state.Post.PostData);
  const myEmail = useSelector((state: RootState) => state.User.myData.email);

  const bool: boolean = myEmail === userEmail;

  return (
    <div className="view_wrapper">
      <div style={{ float: "right" }}>
        <button onClick={() => history.goBack()}>목록</button>
        <button style={bool ? { marginLeft: "30px" } : { display: "none" }}>수정</button>
        <button style={bool ? { marginLeft: "30px" } : { display: "none" }}>삭제</button>
      </div>
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
