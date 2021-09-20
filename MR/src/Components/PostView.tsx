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
  commentList: any;
};

function PostView({ match }: RouteComponentProps<MatchParams>) {
  const [data, setdata] = useState<IData>();
  const [loading, setloading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);
  const [PostCommentData, setPostCommentData] = useState<any>();
  const [comment, setcomment] = useState("");
  const { postId, userEmail } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function CallPostData(id: string) {
      await axios.get(`/api/post/${id}`).then((res) => setdata(res.data));
    }
    async function CallComment(postId: string) {
      await axios.get(`/api/post/${postId}/comment`).then((res) => setPostCommentData(res.data));
    }

    CallPostData(postId).then(() => setloading(false));
    CallComment(postId);
  }, [postId, userEmail, comment, data?.commentList]);

  const myEmail = useSelector((state: RootState) => state.User.userEmail);
  const isLogin = useSelector((state: RootState) => state.User.isLogin); //유저의 로그인 정보 확인

  const bool: boolean = myEmail === userEmail;

  const replyList = PostCommentData?.map((item) => {
    return (
      <Reply
        key={item.commentId}
        commentId={item.commentId}
        userImage={item.userImage}
        userName={item.userName}
        comment={item.comment}
        commentTime={item.commentTime}
        commentList={item.commentList}
        MainPostId={postId}
      />
    );
  });

  //댓글 작성
  const commentOnchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setcomment(e.currentTarget.value);
  };

  //댓글 전송 함수
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setbtnLoading(true);
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
      .then((res) => {
        console.log(res.data);
        setcomment("");
        setbtnLoading(false);
      });
  };

  //게시글 삭제 버튼
  const DeleteHandler = () => {
    const id = postId as unknown as number;
    dispatch(DeletePostHandler(id, history, dispatch));
  };

  return (
    <React.Fragment>
      {loading ? (
        <div style={{ left: "50%", top: "50%" }}>
          <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} />
        </div>
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
                댓글 <span className="reply_count">{PostCommentData?.length}개</span>
              </p>
            </div>
            <ul className="reply_content">{replyList}</ul>
          </div>
          <form onSubmit={onsubmit}>
            <div className="reply_write">
              <div className="form_content">
                <textarea
                  value={comment}
                  onChange={commentOnchangeHandler}
                  placeholder={isLogin ? "댓글을 입력해주세요" : "댓글을 남기시려면 로그인을 해주세요!"}
                  readOnly={isLogin ? false : true}
                ></textarea>
              </div>
              <div className="form_reg">
                <button
                  type="submit"
                  className={isLogin ? "comment_btn" : "comment_btn_not_login"}
                  disabled={isLogin ? false : true}
                >
                  {btnLoading ? <Loader type="Oval" color="#3d66ba" height={15} width={15} timeout={3000} /> : "등록"}
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
