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
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
import "react-quill/dist/quill.core.css";

interface MatchParams {
  postId: string;
  userEmail: string;
}

type IData = {
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

type IAnother = {
  postUnderResponseList: IAnotherArray[];
  postUpperResponseList: IAnotherArray[];
};

type IAnotherArray = {
  postDate: string;
  postId: number;
  postName: string;
};

function PostView({ match }: RouteComponentProps<MatchParams>) {
  const [data, setdata] = useState<IData>();
  const [loading, setloading] = useState(true);
  const [btnLoading, setbtnLoading] = useState(false);
  const [PostCommentData, setPostCommentData] = useState<any>();
  const [anotherPostList, setanotherPostList] = useState<IAnother>();
  const [comment, setcomment] = useState("");
  const [recomment, setrecomment] = useState("");
  const [active, setactive] = useState(-1);
  const { postId, userEmail } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function CallPostData(id: string) {
      await axios.get(`/api/post/${id}`).then((res) => setdata(res.data));
    }
    async function CallComment(postId: string) {
      await axios.get(`/api/post/${postId}/comment`).then((res) => {
        if (res.data.result) {
          setPostCommentData(res.data.value);
        } else {
          dispatch(OpenModalHandler(res.data.description));
          history.push("/");
        }
      });
    }
    async function AnotherPostList(postId: string) {
      await axios.get(`/api/post/another/${postId}`).then((res) => {
        if (res.data.result) {
          setanotherPostList(res.data.value);
        } else {
          dispatch(OpenModalHandler(res.data.description));
        }
      });
    }
    AnotherPostList(postId);
    CallPostData(postId).then(() => setloading(false));
    CallComment(postId);

    return () => {
      setloading(false);
      setbtnLoading(false);
    };
  }, [postId, userEmail, comment, recomment, dispatch, history]);

  const myEmail = useSelector((state: RootState) => state.User.userEmail); //????????? ?????? ??????
  const isLogin = useSelector((state: RootState) => state.User.isLogin); //????????? ????????? ?????? ??????

  const bool: boolean = myEmail === userEmail;
  //?????? ????????? ????????????
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
        recomment={recomment}
        email={data?.postUserEmail}
        myEmail={myEmail}
        setrecomment={setrecomment}
        active={active}
        setactive={setactive}
      />
    );
  });

  //?????? ??????
  const commentOnchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setcomment(e.currentTarget.value);
  };

  //?????? ?????? ??????
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

  //????????? ?????? ??????
  const DeleteHandler = () => {
    const id = postId as unknown as number;
    dispatch(DeletePostHandler(id, history, dispatch));
  };

  //?????? ??????
  const anotherUnderList = anotherPostList?.postUnderResponseList.map((item) => {
    return (
      <tr key={item.postId} className="another_tr">
        <td>
          <Link to={`/post/${userEmail}/${item.postId}`}>{item.postName}</Link>
        </td>
        <td>{item.postDate}</td>
      </tr>
    );
  });

  //?????? ??????
  const anotherUppererList = anotherPostList?.postUpperResponseList.map((item) => {
    return (
      <tr key={item.postId} className="another_tr">
        <td>
          <Link to={`/post/${userEmail}/${item.postId}`}>{item.postName}</Link>
        </td>
        <td>{item.postDate}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      {loading ? (
        <div style={{ left: "50%", top: "50%" }}>
          <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} />
        </div>
      ) : (
        <div className="view_wrapper">
          <div style={{ float: "right" }}>
            <button onClick={() => history.goBack()}>??????</button>
            <Link to={`/post/${postId}`}>
              <button style={bool ? { marginLeft: "30px" } : { display: "none" }}>??????</button>
            </Link>
            <button onClick={DeleteHandler} style={bool ? { marginLeft: "30px" } : { display: "none" }}>
              ??????
            </button>
          </div>
          <div className="view_content">
            <div className="content_info">
              <h2>{data?.postName}</h2>
              <div className="post_info">
                <Link className="nametag" to={`/mypage/${data?.postUserEmail}`}>
                  {data?.postUserEmail}
                </Link>
                <span className="post_date">{data?.date}</span>
              </div>
            </div>
            <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
          </div>
          <div className="another_post_area">
            <table className="another_post">
              <thead>
                <tr>
                  <th>{data?.postUserEmail}??? ?????? ???</th>
                </tr>
              </thead>
              <tbody>
                {anotherUnderList}
                {anotherUppererList}
              </tbody>
            </table>
          </div>
          <div className="reply_area">
            <div className="reply_info">
              <p className="item_inf">
                ?????? <span className="reply_count">{PostCommentData?.length}???</span>
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
                  placeholder={isLogin ? "????????? ??????????????????" : "????????? ??????????????? ???????????? ????????????!"}
                  readOnly={isLogin ? false : true}
                ></textarea>
              </div>
              <div className="form_reg">
                <button
                  type="submit"
                  className={isLogin ? "comment_btn" : "comment_btn_not_login"}
                  disabled={isLogin ? false : true}
                >
                  {btnLoading ? <Loader type="Oval" color="#3d66ba" height={15} width={15} timeout={3000} /> : "??????"}
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
