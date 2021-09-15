import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../modules/Store";
import Loader from "react-loader-spinner";
import "../styles/post-view.scss";
import { DeletePostHandler } from "../modules/action-creator/PostIndex";
import Reply from "./Reply";

interface MatchParams {
  postId: string;
  userEmail: string;
}

export type IData = {
  classification: string;
  content: any;
  id: number;
  postImage: string;
  postName: string;
  postUserEmail: string;
  views: number;
  date: string;
};

function PostView({ match }: RouteComponentProps<MatchParams>) {
  const [data, setdata] = useState<IData>();
  const [loading, setloading] = useState(true);
  const [comment, setcomment] = useState("");
  const { postId, userEmail } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function CallPostData(id: string) {
      await axios.get(`/api/post/${id}`).then((res) => setdata(res.data));
    }

    CallPostData(postId).then(() => setloading(false));
  }, [postId, userEmail]);

  const myEmail = useSelector((state: RootState) => state.User.userEmail);

  const bool: boolean = myEmail === userEmail;

  const commentOnchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setcomment(e.currentTarget.value);
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        `/api/comment/${postId}`,
        {
          comment: comment,
          parentCommentId: 0,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => console.log(res.data));
  };

  const DeleteHandler = () => {
    const id = postId as unknown as number;
    dispatch(DeletePostHandler(id, history, dispatch));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} />
      ) : (
        <div className="view_wrapper">
          <div style={{ float: "right" }}>
            <button onClick={() => history.goBack()}>목록</button>
            <Link to={`/post/${postId}`}>
              <button style={bool ? { marginLeft: "30px" } : { display: "none" }}>수정</button>
            </Link>
            <button onClick={DeleteHandler} style={bool ? { marginLeft: "30px" } : { display: "none" }}>
              삭제
            </button>
          </div>
          <div className="view_content">
            <div className="content_info">
              <h2>{data?.postName}</h2>
              <div className="post_info">
                <Link className="nametag" to="">
                  {data?.postUserEmail}
                </Link>
                <span className="post_date">{data?.date}</span>
              </div>
            </div>
            <div className="view" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
          </div>
          <div className="reply_area">
            <div className="reply_info">
              <p className="item_inf">
                댓글
                <span className="reply_count">5개</span>
              </p>
              <button className="fold" style={{ display: "none" }}>
                댓글 접기
              </button>
              <button className="spread" style={{ display: "none" }}>
                댓글 펼치기
              </button>
            </div>
            <ul className="reply_content">
              <Reply />
            </ul>
          </div>
          <form onSubmit={onsubmit}>
            <div className="reply_write">
              <div className="form_content">
                <textarea
                  value={comment}
                  onChange={commentOnchangeHandler}
                  placeholder="댓글을 입력해주세요."
                ></textarea>
              </div>
              <div className="form_reg">
                <button type="submit" className="comment_btn">
                  등록
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default PostView;
