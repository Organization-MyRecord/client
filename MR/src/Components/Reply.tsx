import { Link } from "react-router-dom";
import "../styles/reply.scss";
interface IArray {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
}

interface IReply {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
  commentList: Array<IArray>;
}

function Reply(props: IReply) {
  return (
    <li className="comment">
      <Link to="" className="reply_thumb">
        <img
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
        <span className="date">{props.commentTime}</span>
        <div className="modify">
          <Link to="">
            <p>답글</p>
          </Link>
          <Link to="">
            <p>수정/삭제</p>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default Reply;
