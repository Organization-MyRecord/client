import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import "../styles/reply.scss";
import { useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
interface IArray {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
}

export interface IReply {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
  MainPostId: string;
  commentList: IArray[];
  recomment: string;
  email: string;
  myEmail: string;
  setrecomment: (text: string) => void;
  active: number;
  setactive: (num: number) => void;
}
function Reply(props: IReply) {
  const dispatch = useDispatch();
  const [state, setstate] = useState(false); //대댓글 리스트보이게 하는 state
  const [btnLoading, setbtnLoading] = useState(false);
  const { recomment, setrecomment } = props;

  //답글달기 하나만 보이게 하기
  const toggleHandler = () => {
    props.setactive(props.commentId);
    if (props.active === props.commentId) {
      props.setactive(-1);
    }
  };

  //대댓글 작성 함수
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setbtnLoading(true);
    await axios
      .post(
        `/api/comment/${props.MainPostId}`,
        {
          comment: recomment,
          parentCommentId: props.commentId,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        console.log(res.data);
        setrecomment("");
        setbtnLoading(false);
      });
  };

  //대댓글 작성
  const reCommentOnchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setrecomment(e.currentTarget.value);
  };

  //댓글 삭제 함수
  const DeleteCommentHandler = async () => {
    axios
      .delete(`/api/comment/${props.MainPostId}/${props.commentId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(() => {
        dispatch(OpenModalHandler("댓글 삭제가 완료되었습니다."));
      });
  };

  const Recomment = props.commentList.map((item) => {
    return (
      <li className="childReply_item" key={item.commentId}>
        <div className="comment_1">
          <Link to="" className="reply_thumb">
            <img
              alt="user_profile"
              src={
                item.userImage === null || item.userImage === "string"
                  ? "https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png"
                  : item.userImage
              }
            />
          </Link>
          <div className="reply_box">
            <Link to="" className="link_name">
              <span>{item.userName}</span>
            </Link>
            <p>{item.comment}</p>
            <p className="date">{item.commentTime}</p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <li className="comment">
      <Link to="" className="reply_thumb">
        <img
          alt="user_profile"
          src={
            props.userImage === null || props.userImage === "string"
              ? "https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png"
              : props.userImage
          }
        />
      </Link>
      <div className="reply_box">
        <Link to="" className="link_name">
          <span>{props.userName}</span>
        </Link>
        <p>{props.comment}</p>
        <p className="date">{props.commentTime}</p>
        <div style={{ display: "flex", marginTop: "18px" }}>
          <div className={props.commentList.length === 0 ? "modify_none" : "modify"} onClick={() => setstate(!state)}>
            <FaPlusSquare className="plus" size="19" />
            <p>{props.commentList.length}개의 답글</p>
          </div>

          <h5 className="recomment_btn" onClick={toggleHandler}>
            답글달기
          </h5>
          <h5
            className="recomment_btn"
            onClick={DeleteCommentHandler}
            style={props.email === props.myEmail ? { display: "" } : { display: "none" }}
          >
            삭제
          </h5>
        </div>
        <form
          className={props.active === props.commentId ? "" : "recomment_form"}
          onSubmit={onsubmit}
          style={{ marginBottom: "70px" }}
        >
          <div className="reply_write">
            <div className="form_content">
              <textarea
                value={recomment}
                onChange={reCommentOnchangeHandler}
                placeholder="답글을 입력해주세요."
              ></textarea>
            </div>
            <div className="form_reg">
              <button type="submit" className="comment_btn">
                {btnLoading ? <Loader type="Oval" color="#3d66ba" height={15} width={15} timeout={3000} /> : "등록"}
              </button>
            </div>
          </div>
        </form>
        <ul className={state ? "childReply_list" : "childReply_list_none"}>{Recomment}</ul>
      </div>
    </li>
  );
}

export default Reply;
